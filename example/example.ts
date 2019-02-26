import { startMiner, getAllDevices } from '../src'
import { EthminerError } from '../src/EthminerError'

startMiner({
  farmRecheck: 1000,
  poolUrl: `stratum1+tcp://0x6fF85749ffac2d3A36efA2BC916305433fA93731@eth-us-west1.nanopool.org:9999/lettuce-wrap/notinuse@salad.io`,
})
  .then(code => {
    console.log('Return code ' + code)
  })
  .catch(e => {
    console.log('Error return ' + (e as EthminerError).code)
  })

getAllDevices().then(list => {
  console.log(list)
  getAllDevices().then(list => {
    console.log(list)
  })
})

getAllDevices().then(list => {
  console.log(list)
})
