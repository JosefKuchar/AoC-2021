import { test, readInput } from '../utils/index';

const prepareInput = (rawInput: string) =>
  rawInput
    .trim()
    .split('\n')
    .map(line => line.split('').map(Number));

const input = prepareInput(readInput('day09'));

const dirs = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const goA = (input: number[][]) => {
  return input.reduce(
    (a, row, i) =>
      a +
      row.reduce(
        (b, num, j) =>
          dirs.every(dir => (input[i + dir[0]]?.[j + dir[1]] ?? 10) > num)
            ? b + num + 1
            : b,
        0
      ),
    0
  );
};

const goB = (input: number[][]) => {
  const lows: { [key: string]: number } = {};
  input.forEach((row, i) => {
    row.forEach((num, j) => {
      if (num !== 9) {
        let [x, y] = [i, j];
        while (true) {
          const dirIndex = dirs.reduce(
            ({ min, dirIndex }, dir, i) =>
              (input[x + dir[0]]?.[y + dir[1]] ?? 10) < min
                ? { min: input[x + dir[0]][y + dir[1]], dirIndex: i }
                : { min, dirIndex },
            { min: input[x][y], dirIndex: -1 }
          ).dirIndex;
          if (dirIndex === -1) {
            lows[`${x}-${y}`] = (lows[`${x}-${y}`] ?? 0) + 1;
            break;
          }
          x += dirs[dirIndex][0];
          y += dirs[dirIndex][1];
        }
      }
    });
  });
  const basins = Object.values(lows).sort((a, b) => b - a);
  return basins[0] * basins[1] * basins[2];
};

/* Tests */

const testInput = prepareInput(`
2199943210
3987894921
9856789892
8767896789
9899965678`);

test(goA(testInput), 15);
test(goB(testInput), 1134);

/* Results */

console.time('Time');
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd('Time');

console.log('Solution to part 1:', resultA);
console.log('Solution to part 2:', resultB);
