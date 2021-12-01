import { readFileSync } from "fs"

export const readInput = (path: string) => {
  const file = `src/${path}/input.txt`

  return readFileSync(file).toString()
}
