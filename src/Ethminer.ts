import { ChildProcess, spawn } from 'child_process'
import { EthminerError } from './EthminerError'

/** @internal */
export const spawnEthminer = (args: string): Ethminer => {
  let ls = spawn(`cd dist && cd ethminer && ethminer --syslog ${args}`, {
    shell: true,
    stdio: 'pipe',
  })

  return new Ethminer(ls)
}

export class Ethminer {
  constructor(private readonly ls: ChildProcess) {}
  readLine = () => {
    return new Promise<string>((resolve, reject) => {
      this.ls.stdout.on('data', data => {
        resolve(String(data))
      })

      this.ls.stderr.on('data', data => {
        let msg = String(data)
        console.error(msg)
        reject(msg)
      })
    })
  }

  readLines = (lineCallback?: (line: string) => void) => {
    let currentString = ''
    return new Promise<number>((resolve, reject) => {
      if (lineCallback) {
        //For some reason all log messages from ethminer come on stderr not stdout...
        this.ls.stderr.on('data', data => {
          currentString += data
          let tokens = currentString.split('\n')

          if (tokens.length > 1) {
            for (var i = 0; i < tokens.length - 1; i++) {
              lineCallback(tokens[i])
            }
            currentString = tokens[tokens.length - 1]
          }
        })
      }

      this.ls.on('close', code => {
        console.log(`child process exited with code ${code}`)
        reject(new EthminerError(code))
      })
    })
  }
}
