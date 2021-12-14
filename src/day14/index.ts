import { test, readInput } from '../utils/index';

interface Input {
  template: string;
  rules: string[][];
}

interface Counts {
  [key: string]: number;
}

const prepareInput = (rawInput: string) => {
  const input = rawInput.trim().split('\n\n');
  return {
    template: input[0],
    rules: input[1].split('\n').map(line => line.split(' -> ')),
  };
};

const input = prepareInput(readInput('day14'));

const doStep = (state: Counts, rules: string[][], chars: Counts) => {
  let newState: Counts = {};
  Object.keys(state).forEach((pair: string) => {
    const rule = rules.find(rule => rule[0] === pair);
    if (rule) {
      const [pair1, pair2] = [
        pair.charAt(0) + rule[1],
        rule[1] + pair.charAt(1),
      ];
      newState[pair1] = (newState[pair1] ?? 0) + state[pair];
      newState[pair2] = (newState[pair2] ?? 0) + state[pair];
      chars[rule[1]] = (chars[rule[1]] ?? 0) + state[pair];
    } else {
      newState[pair] = (newState[pair] ?? 0) + state[pair];
    }
  });
  return newState;
};

const go = (input: Input, iters: number) => {
  let state: Counts = {};
  let chars: Counts = {};
  for (let i = 0; i < input.template.length; i++) {
    const sub = input.template.substring(i, i + 2);
    const char = input.template.charAt(i);
    state[sub] = (state[sub] ?? 0) + 1;
    chars[char] = (chars[char] ?? 0) + 1;
  }
  for (let i = 0; i < iters; i++) {
    state = doStep(state, input.rules, chars);
  }
  const quantities = Object.values(chars).sort((a, b) => a - b);
  return quantities[quantities.length - 1] - quantities[0];
};

const goA = (input: Input) => go(input, 10);
const goB = (input: Input) => go(input, 40);

/* Tests */

const testInput = prepareInput(`
NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`);

test(goA(testInput), 1588);
test(goB(testInput), 2188189693529);

/* Results */

console.time('Time');
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd('Time');

console.log('Solution to part 1:', resultA);
console.log('Solution to part 2:', resultB);
