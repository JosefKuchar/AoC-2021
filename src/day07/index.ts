import { test, readInput } from '../utils/index';

const prepareInput = (rawInput: string) =>
  rawInput.trim().split(',').map(Number);

const input = prepareInput(readInput('day07'));

const go = (input: number[], calcFuel: (offset: number) => number) => {
  let min = Number.MAX_SAFE_INTEGER;
  const max = Math.max(...input);
  for (let i = 0; i <= max; i++) {
    const fuel = input.reduce(
      (acc, position) => acc + calcFuel(Math.abs(position - i)),
      0
    );
    if (fuel < min) {
      min = fuel;
    }
  }
  return min;
};

const goA = (input: number[]) => go(input, offset => offset);
const goB = (input: number[]) =>
  go(input, offset => (offset * (1 + offset)) / 2);

/* Tests */

const testInput = prepareInput(`16,1,2,0,4,2,7,1,2,14`);

test(goA(testInput), 37);
test(goB(testInput), 168);

/* Results */

console.time('Time');
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd('Time');

console.log('Solution to part 1:', resultA);
console.log('Solution to part 2:', resultB);
