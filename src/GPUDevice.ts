/** GPU Device types */
export type DeviceType = 'cuda' | 'openCL' | 'mixed'

/**
 * An instance of a GPU.
 */
export class GPUDevice {
  constructor(readonly name: string, readonly type: DeviceType) {}
}
