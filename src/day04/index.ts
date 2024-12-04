import run from "aocrunner"

const parseInput = (rawInput: string) => {
  return rawInput.split('\n').map(line => line.split(''))
}

const getCoord = (coord: [number, number], input: string[][]) => {
  const [x, y] = coord
  if (y < 0 || y > input.length - 1 || x < 0 || x > input[y].length - 1) {
    return '-'
  }
  return input[y][x]
}

const getLine = (start: [number, number], increment: [number, number], steps: number, input: string[][]) => {
  let line = ''
  for (let i = 0; i < steps; ++i) {
    line += getCoord([start[0] + (increment[0] * i), start[1] + (increment[1] * i)], input)
  }
  return line
}

const matchesPartOne = [
  'XMAS',
  'SAMX'
]
const claimed = new Set<string>()
const isLineValid = (start: [number, number], increment: [number, number], steps: number, input: string[][]) => {
  let end = [start[0] + (increment[0] * (steps - 1)), start[1] + (increment[1] * (steps - 1))]
  let id = `[${start[0]},${start[1]}]-[${end[0]},${end[1]}]`
  let inverseId = `[${end[0]},${end[1]}]-[${start[0]},${start[1]}]`
  if (claimed.has(id) || claimed.has(inverseId)) {
    return false
  }
  let line = getLine(start, increment, steps, input)
  const match = matchesPartOne.includes(line)
  if (match) {
    claimed.add(id)
    claimed.add(inverseId)
  }
  return match
}

const part1 = (rawInput: string) => {
  claimed.clear()
  const input = parseInput(rawInput)
  let total = 0
  for (let y = 0; y < input.length; ++y) {
    for (let x = 0; x < input[y].length; ++x) {
      const coord: [number, number] = [x, y]
      total += [
        // horizontal
        isLineValid(coord, [1, 0], 4, input),
        isLineValid(coord, [-1, 0], 4, input),
        // vertical
        isLineValid(coord, [0, 1], 4, input),
        isLineValid(coord, [0, -1], 4, input),
        // diagonal \
        isLineValid(coord, [1, 1], 4, input),
        isLineValid(coord, [-1, 1], 4, input),
        // diagonal /
        isLineValid(coord, [1, -1], 4, input),
        isLineValid(coord, [-1, -1], 4, input),
      ].filter(match => match).length
    }
  }
  return total
}

const matchesPartTwo = [
  'MAS',
  'SAM'
]
const isXValid = (start: [number, number], input: string[][]) => {
  const middle = getCoord(start, input)
  if (middle === 'A') {
    // \
    const diagonalOne = getLine([start[0] - 1, start[1] - 1], [1, 1], 3, input)
    // /
    const diagonalTwo = getLine([start[0] + 1, start[1] - 1], [-1, 1], 3, input)
    return matchesPartTwo.includes(diagonalOne) && matchesPartTwo.includes(diagonalTwo)
  }
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let total = 0
  for (let y = 0; y < input.length; ++y) {
    for (let x = 0; x < input[y].length; ++x) {
      const coord: [number, number] = [x, y]
      if (isXValid(coord, input)) {
        total += 1
      }
    }
  }
  return total
}

run({
  part1: {
    tests: [
      {
        input: `..X...
.SAMX.
.A..A.
XMAS.S
.X....`,
        expected: 4,
      },
      {
        input: `....XXMAS.
.SAMXMS...
...S..A...
..A.A.MS.X
XMASAMX.MM
X.....XA.A
S.S.S.S.SS
.A.A.A.A.A
..M.M.M.MM
.X.X.XMASX`,
        expected: 18
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
