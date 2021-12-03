import { test, readInput } from '../utils/index';

const prepareInput = (rawInput: string) =>
  rawInput
    .trim()
    .split('\n')
    .map(line => line.split(''));

const input = prepareInput(readInput('day03'));

const countColumn = (lines: string[][], index: number) =>
  lines.reduce(
    ([zeros, ones], line) =>
      line[index] == '0' ? [zeros + 1, ones] : [zeros, ones + 1],
    [0, 0]
  );

const goA = (input: string[][]) => {
  let [gamma, epsilon] = [0, 0];
  for (let i = 0; i < input[0].length; i++) {
    let [zeros, ones] = countColumn(input, i);
    const mult = Math.pow(2, input[0].length - i - 1);
    gamma += (zeros > ones ? 1 : 0) * mult;
    epsilon += (zeros > ones ? 0 : 1) * mult;
  }
  return gamma * epsilon;
};

const filterOut = (
  lines: string[][],
  index: number,
  most: boolean
): string[] => {
  if (lines.length === 1) {
    return lines[0];
  }
  const [zeros, ones] = countColumn(lines, index);
  return filterOut(
    lines.filter(line => line[index] == (!most !== ones >= zeros ? '1' : '0')),
    index + 1,
    most
  );
};

const lineToNumber = (line: string[]) =>
  line.reduce(
    (acc, current, i) =>
      acc + (current == '1' ? 1 : 0) * Math.pow(2, line.length - i - 1),
    0
  );

const goB = (input: string[][]) =>
  lineToNumber(filterOut(input, 0, true)) *
  lineToNumber(filterOut(input, 0, false));

/* Tests */

const testInput = prepareInput(`
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`);

test(goA(testInput), 198);
test(goB(testInput), 230);

/* Results */

console.time('Time');
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd('Time');

console.log('Solution to part 1:', resultA);
console.log('Solution to part 2:', resultB);
