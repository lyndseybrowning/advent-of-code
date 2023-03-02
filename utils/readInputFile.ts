import fs from 'fs'

export const readFile = (file: string): string => {
  return fs.readFileSync(file, 'utf-8')
}
