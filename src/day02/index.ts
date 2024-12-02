import run from "aocrunner"

const orderByAscending = (line: number[]) => {
  let errorThreshold = 2

  if (line.length <= 1) {
    return line
  }

  for (let i = 1; i < line.length; i++) {
    if (line[i - 1] > line[i] && --errorThreshold <= 0) {
      line = line.reverse()
      break
    }
  }
  return line
}

const parseInput = (rawInput: string) => {
  return rawInput
    .split('\n')
    .map(line => line.split(' ').map(Number))
    .map(orderByAscending)
}

const isValidLine = (line: number[]) => {
  for (let i = 0; i < line.length - 1; ++i) {
    const diff = line[i + 1] - line[i]
    if (diff < 1 || diff > 3) {
      return false
    }
  }
  return true
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const passes = input.filter(isValidLine)
  return passes.length
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const passes = input.filter(line => {
    for (let i = 0; i < line.length; ++i) {
      const newLine = [...line]
      //test if the line is valid with each iterated index removed
      newLine.splice(i, 1)
      if (isValidLine(newLine)) {
        return true
      }
    }
    return false
  })
  return passes.length
}

run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 4,
      },
      {
        input: `48 46 47 49 51 54 56
1 1 2 3 4 5
1 2 3 4 5 5
5 1 2 3 4 5
1 4 3 2 1
1 6 7 8 9
1 2 3 4 3
9 8 7 6 7`,
        expected: 8
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
