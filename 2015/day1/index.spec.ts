import { part1, part2 } from './index'

describe('day1: part1', () => {
  it.each([
    { input: '(())', expected: 0 },
    { input: '(()(()(', expected: 3 },
    { input: ')())())', expected: -3 },
  ])('should return the correct floor', ({ input, expected }) => {
    expect(part1(input)).toEqual(expected)
  })
})

describe('day1: part2', () => {
  it.each([
    { input: ')', expected: 1 },
    { input: '()())', expected: 5 },
  ])(
    'should return the position when basement is first entered',
    ({ input, expected }) => {
      expect(part2(input)).toEqual(expected)
    }
  )
})
