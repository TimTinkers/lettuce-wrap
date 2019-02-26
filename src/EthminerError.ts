/**
 * An error returned from Ethminer
 */
export class EthminerError extends Error {
  constructor(public readonly code: number, message?: string) {
    super(`${code}-${message}`)
    // see: typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
    Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
    this.name = EthminerError.name // stack traces display correctly now
  }
}
