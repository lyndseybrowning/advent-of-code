import { readFile } from '../../utils/readInputFile'

enum Direction {
  UP = '(',
  DOWN = ')',
}

const directions = {
  [Direction.UP]: 1,
  [Direction.DOWN]: -1,
}

export const part1 = (input: string): number => {
  const floor = input.split('').reduce((cur: number, next: string) => {
    return cur + directions[next as Direction]
  }, 0)

  return floor
}

export const part2 = (input: string): number => {
  let currentFloor = 1
  const basementIndex = input.split('').findIndex((direction) => {
    currentFloor += directions[direction as Direction]
    return currentFloor < 1
  })

  return basementIndex + 1
}

const input = readFile('./2015/day1/input.txt')

const p1 = part1(input)
const p2 = part2(input)

console.log({ p1, p2 })
