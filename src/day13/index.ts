import { test, readInput } from '../utils/index';

interface Input {
  points: number[][];
  folds: {
    dir: string;
    coord: number;
  }[];
}

const prepareInput = (rawInput: string) => {
  const input = rawInput.trim().split('\n\n');
  return {
    points: input[0].split('\n').map(line => line.split(',').map(Number)),
    folds: input[1].split('\n').map(line => {
      const parts = line.split(' ');
      const last = parts[2].split('=');
      return {
        dir: last[0],
        coord: parseInt(last[1]),
      };
    }),
  };
};

const input = prepareInput(readInput('day13'));

const doFolds = (input: Input, onlyOne: boolean) => {
  let state = input.points;
  for (let i = 0; i < (onlyOne ? 1 : input.folds.length); i++) {
    const fold = input.folds[i];
    state = state.map(point => {
      if (fold.dir === 'x') {
        return point[0] < fold.coord
          ? [...point]
          : [2 * fold.coord - point[0], point[1]];
      } else {
        return point[1] < fold.coord
          ? [...point]
          : [point[0], 2 * fold.coord - point[1]];
      }
    });
  }
  return state;
};

const goA = (input: Input) =>
  new Set(doFolds(input, true).map(point => `${point[0]}-${point[1]}`)).size;

const goB = (input: Input) => {
  const state = doFolds(input, false);
  const map = new Array(6).fill(0).map(() => new Array(39).fill('.'));
  state.forEach(point => {
    map[point[1]][point[0]] = '#';
  });
  return map.reduce((buf, line) => buf + line.join('') + '\n', '\n');
};

/* Tests */

const testInput = prepareInput(`
6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`);

test(goA(testInput), 17);

/* Results */

console.time('Time');
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd('Time');

console.log('Solution to part 1:', resultA);
console.log('Solution to part 2:', resultB);
