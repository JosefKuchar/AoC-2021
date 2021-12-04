import { test, readInput } from '../utils/index';

interface Input {
  draws: number[];
  bingos: number[][][];
}

const prepareInput = (rawInput: string) => {
  const input = rawInput.trim().split('\n\n');
  return {
    draws: input[0].split(',').map(Number),
    bingos: input
      .filter((_, i) => i !== 0)
      .map(bingo =>
        bingo.split('\n').map(line => line.trim().split(/\s+/).map(Number))
      ),
  };
};

const input = prepareInput(readInput('day04'));

const checkWin = (table: number[][]) => {
  for (let i = 0; i < table.length; i++) {
    let [a, b] = [true, true];
    for (let j = 0; j < table.length; j++) {
      a = a && table[i][j] === -1;
      b = b && table[j][i] === -1;
    }
    if (a || b) {
      return true;
    }
  }
  return false;
};

const makeDraw = (bingos: number[][][], draw: number) =>
  bingos.map(bingo =>
    bingo.map(line => line.map(num => (num === draw ? -1 : num)))
  );

const goA = (input: Input) => {
  let bingos = input.bingos;
  let winning: number[][] | undefined;
  const lastDraw =
    input.draws.find(draw => {
      bingos = makeDraw(bingos, draw);
      winning = bingos.find(bingo => checkWin(bingo));
      return typeof winning !== 'undefined';
    }) ?? 1;
  const sum =
    winning?.reduce(
      (a, line) => a + line.reduce((b, num) => (num !== -1 ? b + num : b), 0),
      0
    ) ?? 1;
  return lastDraw * sum;
};

const goB = (input: Input) => {
  let bingos = input.bingos;
  input.draws.every(draw => {
    bingos = makeDraw(bingos, draw);
    bingos = bingos.filter(bingo => !checkWin(bingo));
    return bingos.length != 1;
  });
  return goA({
    draws: input.draws,
    bingos,
  });
};

/* Tests */

const testInput = prepareInput(`
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`);

test(goA(testInput), 4512);
test(goB(testInput), 1924);

/* Results */

console.time('Time');
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd('Time');

console.log('Solution to part 1:', resultA);
console.log('Solution to part 2:', resultB);
