import { test, readInput } from '../utils/index';

const prepareInput = (rawInput: string) =>
  rawInput
    .trim()
    .split('\n')
    .map(line => line.split('').map(Number));

const input = prepareInput(readInput('day11'));

const goA = (input: number[][]) => {
  let state = input;
  let flashes = 0;
  for (let i = 0; i < 100; i++) {
    state = state.map(line => line.map(num => num + 1));
    while (state.some(line => line.some(num => num > 9))) {
      state.forEach((line, i) =>
        line.forEach((num, j) => {
          if (num > 9) {
            for (let x = -1; x <= 1; x++) {
              for (let y = -1; y <= 1; y++) {
                if (
                  typeof state[i + x]?.[j + y] !== 'undefined' &&
                  state[i + x][j + y] !== 0 &&
                  (x !== 0 || y !== 0)
                ) {
                  state[i + x][j + y]++;
                }
              }
            }
            flashes++;
            state[i][j] = 0;
          }
        })
      );
    }
  }
  return flashes;
};

const goB = (input: number[][]) => {
  let state = input;
  for (let i = 0; ; i++) {
    state = state.map(line => line.map(num => num + 1));
    while (state.some(line => line.some(num => num > 9))) {
      state.forEach((line, i) =>
        line.forEach((num, j) => {
          if (num > 9) {
            for (let x = -1; x <= 1; x++) {
              for (let y = -1; y <= 1; y++) {
                if (
                  typeof state[i + x]?.[j + y] !== 'undefined' &&
                  state[i + x][j + y] !== 0 &&
                  (x !== 0 || y !== 0)
                ) {
                  state[i + x][j + y]++;
                }
              }
            }
            state[i][j] = 0;
          }
        })
      );
    }
    if (state.every(line => line.every(num => num === 0))) {
      return i + 1;
    }
  }
};

/* Tests */

const testInput = prepareInput(`
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`);

test(goA(testInput), 1656);
test(goB(testInput), 195);

/* Results */

console.time('Time');
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd('Time');

console.log('Solution to part 1:', resultA);
console.log('Solution to part 2:', resultB);
