import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const multiply = (input: string) => {
  const mul = /mul\((\d{0,3},\d{0,3})\)/g
  let result
  let total = 0
  while ((result = mul.exec(input)) !== null) {
    const parsed = result[1].split(',').map(Number)
    total += (parsed[0] * parsed[1])
  }
  return total
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  return multiply(input)
}

const part2 = (rawInput: string) => {
  let input = parseInput(rawInput)
  let startTrimIndex = 0
  while (true) {
    startTrimIndex = input.indexOf("don't()")
    if (startTrimIndex >= 0) {
      const endTrimIndex = input.indexOf("do()", startTrimIndex)
      const inputToRemove = input.substring(startTrimIndex, endTrimIndex >= 0 ? endTrimIndex : undefined)
      input = input.replace(inputToRemove, '')
    } else {
      break
    }
  }
  return multiply(input)
}

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
