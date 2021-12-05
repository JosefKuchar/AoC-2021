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
    if (diagonals || line[0][0] == line[1][0] || line[0][1] == line[1][1]) {
      let [x, y] = [0, 0];
      while (line[0][0] + x !== line[1][0] || line[0][1] + y !== line[1][1]) {
        map[line[0][0] + x][line[0][1] + y]++;
        if (line[0][0] > line[1][0]) {
          x--;
        } else if (line[0][0] < line[1][0]) {
          x++;
        }
        if (line[0][1] > line[1][1]) {
          y--;
        } else if (line[0][1] < line[1][1]) {
          y++;
        }
      }
      map[line[0][0] + x][line[0][1] + y]++;
    }
  })
  return map.reduce((a, row) => a + row.reduce((b, num) => num >= 2 ? b + 1 : b, 0), 0);
}

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
