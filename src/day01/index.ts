import run from "aocrunner"

const parseInput = (rawInput: string) => {
  const split = rawInput
    .split('\n')
    .reduce((acc: { left: number[], right: number[] }, line: string) => {
      const parsedNumbers = line.split('   ').map(Number)
      acc.left.push(parsedNumbers[0])
      acc.right.push(parsedNumbers[1])
      return acc
    }, { left: [], right: [] })
  split.left.sort()
  split.right.sort()
  return split
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let total = 0
  for (let i = 0; i < input.left.length && i < input.right.length; ++i) {
    total += Math.abs(input.left[i] - input.right[i])
  }
  return total
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let total = 0
  for (let i = 0; i < input.left.length && i < input.right.length; ++i) {
    const current = input.left[i]
    const count = input.right.filter(value => value === current).length
    total += current * count
  }
  return total
}

run({
  part1: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3
`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
