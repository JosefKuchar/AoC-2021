import { test, readInput } from '../utils/index';

const prepareInput = (rawInput: string) =>
  rawInput.trim().split(',').map(Number);

const input = prepareInput(readInput('day06'));

const go = (input: number[], days: number) => {
  let counter: number[] = new Array(9).fill(0);
  input.forEach(fish => {
    counter[fish]++;
  });
  for (let i = 0; i < days; i++) {
    const fish = counter.shift() ?? 0;
    counter[6] += fish;
    counter[8] = fish;
  }
  return counter.reduce((a, b) => a + b, 0);
};

const goA = (input: number[]) => go(input, 80);
const goB = (input: number[]) => go(input, 256);

/* Tests */

const testInput = prepareInput(`3,4,3,1,2`);
test(goA(testInput), 5934);
test(goB(testInput), 26984457539);

/* Results */

console.time('Time');
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd('Time');

console.log('Solution to part 1:', resultA);
console.log('Solution to part 2:', resultB);
