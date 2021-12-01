import { test, readInput } from "../utils/index";

const prepareInput = (rawInput: string) =>
  rawInput.trim().split("\n").map(Number);

const input = prepareInput(readInput("day01"));

const goA = (input: number[]) =>
  input.reduce(
    ({ inc, prev }, curr) => ({
      inc: curr > prev ? inc + 1 : inc,
      prev: curr,
    }),
    { inc: 0, prev: Number.MAX_SAFE_INTEGER }
  ).inc;

const goB = (input: number[]) =>
  goA(
    input.flatMap((value, i) =>
      i < input.length - 2 ? value + input[i + 1] + input[i + 2] : []
    )
  );

/*  Tests */

const testInput = prepareInput(`
199
200
208
210
200
207
240
269
260
263`);

test(goA(testInput), 7);
test(goB(testInput), 5);

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
