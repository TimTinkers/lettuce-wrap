import { Ethminer, spawnEthminer } from './Ethminer'
import { GPUDevice, DeviceType } from './GPUDevice'
import { EthminerError } from './EthminerError'

/** The currently detected environment */
let currentType: DeviceType | undefined

/** The list of discovered devices */
let deviceList: GPUDevice[] | undefined

let currentRate: number = 0

/**
 * Options used to start the miner
 */
export interface MinerOptions {
  poolUrl: string
  farmRecheck?: number
}

/**
 * Gets the device list for the specified type. Ethminer --list-devices
 * @param type The type of devices to query for.
 */
export const getDeviceList = async (type: DeviceType): Promise<GPUDevice[]> => {
  let miner = spawnEthminer(`${getFlag(type)} --list-devices`)

  let out = await miner.readLine()
  let lines = out.split('\n')

  var devices: GPUDevice[] = []

  for (let line of lines) {
    if (line.startsWith('FORMAT') || line.startsWith('Listing')) continue

    let tokens = line.split(']')

    if (tokens.length === 1) continue

    let deviceName = tokens[tokens.length - 1].trim()

    let device = new GPUDevice(deviceName, type)

    devices.push(device)
  }

  return devices
}

/**
 * Gets the complete set of devices
 * @param force Forces the queries instead of returning a cached value
 */
export const getAllDevices = async (force: boolean = false): Promise<GPUDevice[]> => {
  // Check cache first and return results instead
  if (!force && deviceList !== undefined) {
    return deviceList
  }

  let devices: GPUDevice[] = []

  let ocl = getDeviceList('openCL')
  let cuda = getDeviceList('cuda')

  try {
    let d = await ocl
    devices.push.apply(devices, d)
    d = await cuda
    devices.push.apply(devices, d)
    //Change to a mixed type if we already detected openCL
    currentType = currentType === 'openCL' ? 'mixed' : 'cuda'
  } catch (e) {}

  deviceList = devices
  currentType = getDeviceType(devices)

  return devices
}

/**
 * Starts the miner
 */
export const startMiner = async (options: MinerOptions): Promise<number> => {
  if (currentType === undefined) {
    await getAllDevices()
  }

  if (currentType === undefined) {
    throw new EthminerError(1, 'Unable to determine device type')
  }

  let cmd = '-L '

  if (options.farmRecheck !== undefined) {
    cmd += `--farm-recheck ${options.farmRecheck}`
  }

  cmd += ` ${getFlag(currentType)} -P ${options.poolUrl}`

  let miner: Ethminer
  try {
    miner = spawnEthminer(cmd)
  } catch (e) {
    console.log('catch error')
    throw new EthminerError(1, 'Unable to determine device type')
  }

  try {
    let r = await miner.readLines(line => {
      if (line.startsWith('main     Speed')) {
        let tokens = line.split(' ')
        if (tokens.length >= 6) {
          currentRate = +tokens[6]
          console.log('Speed now ' + currentRate)
        }
      }
    })
  } catch (e) {
    throw e
  }
  return 0
}

const getFlag = (type: DeviceType) => {
  switch (type) {
    case 'cuda':
      return '-U'
    case 'openCL':
      return '-G'
    case 'mixed':
      return '-X'
  }
}

const getDeviceType = (devices: GPUDevice[]): DeviceType | undefined => {
  let type: DeviceType | undefined

  devices.forEach(d => {
    if (type === 'mixed') {
      return
    }
    if (type === undefined) {
      type = d.type
    } else if (d.type !== type) {
      type = 'mixed'
    }
  })

  return type
}
