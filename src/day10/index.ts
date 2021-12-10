import { test, readInput } from '../utils/index';

const prepareInput = (rawInput: string) =>
  rawInput
    .trim()
    .split('\n')
    .map(line => line.split(''));

const input = prepareInput(readInput('day10'));

const points: { [key: string]: number } = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const corresponding: { [key: string]: string } = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

const goA = (input: string[][]) =>
  input.reduce((score, line) => {
    const stack = [];
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (typeof corresponding[char] !== 'undefined') {
        stack.push(char);
      } else {
        if (corresponding[stack.pop() ?? ''] != char) {
          return score + points[char];
        }
      }
    }
    return score;
  }, 0);

const goB = (input: string[][]) => {
  const scores = input
    .flatMap(line => {
      const stack = [];
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (typeof corresponding[char] !== 'undefined') {
          stack.push(char);
        } else {
          if (corresponding[stack.pop() ?? ''] != char) {
            return [];
          }
        }
      }
      return stack.reduceRight((score, char) => score * 5 + points[char], 0);
    }, 0)
    .sort((a, b) => a - b);
  return scores[Math.floor(scores.length / 2)];
};

/* Tests */

const testInput = prepareInput(`
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`);

test(goA(testInput), 26397);
test(goB(testInput), 288957);

/* Results */

console.time('Time');
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd('Time');

console.log('Solution to part 1:', resultA);
console.log('Solution to part 2:', resultB);
