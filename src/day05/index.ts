import { test, readInput } from '../utils/index';

const prepareInput = (rawInput: string) =>
  rawInput
    .trim()
    .split('\n')
    .map(line => line.split(' -> ').map(side => side.split(',').map(Number)));

const input = prepareInput(readInput('day05'));

const go = (input: number[][][], diagonals: boolean) => {
  let map = new Array(1000).fill(0).map(() => new Array(1000).fill(0));
  input.forEach(line => {
    let [a, b, c, d] = [line[0][0], line[0][1], line[1][0], line[1][1]];
    if (diagonals || a === c || b === d) {
      while (a !== c || b !== d) {
        map[a][b]++;
        if (a > c) {
          a--;
        } else if (a < c) {
          a++;
        }
        if (b > d) {
          b--;
        } else if (b < d) {
          b++;
        }
      }
      map[a][b]++;
    }
  });
  return map.reduce(
    (a, row) => a + row.reduce((b, num) => (num >= 2 ? b + 1 : b), 0),
    0
  );
};

const goA = (input: number[][][]) => go(input, false);
const goB = (input: number[][][]) => go(input, true);

/* Tests */

const testInput = prepareInput(`
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`);

test(goA(testInput), 5);
test(goB(testInput), 12);

/* Results */

console.time('Time');
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd('Time');

console.log('Solution to part 1:', resultA);
console.log('Solution to part 2:', resultB);
