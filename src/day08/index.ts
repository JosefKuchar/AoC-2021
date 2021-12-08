import { test, readInput } from '../utils/index';

interface Line {
  patterns: string[];
  output: string[];
}

interface Decoded {
  [key: string]: number;
}

const prepareInput = (rawInput: string) =>
  rawInput
    .trim()
    .split('\n')
    .map(line => {
      const sides = line.split(' | ');
      return {
        patterns: sides[0].split(' '),
        output: sides[1].split(' '),
      };
    });

const input = prepareInput(readInput('day08'));

const goA = (input: Line[]) => {
  return input.reduce(
    (a, line) =>
      a +
      line.output.reduce(
        (b, word) => ([2, 3, 4, 7].includes(word.length) ? b + 1 : b),
        0
      ),
    0
  );
};

const subset = (a: string, b: string) =>
  a.split('').every(char => b.includes(char));

const count = (a: string, b: string) =>
  a.split('').reduce((acc, char) => (b.includes(char) ? acc + 1 : acc), 0);

const getKey = (d: Decoded, value: number) =>
  Object.keys(d).find(key => d[key] === value) ?? '';

const find = (line: Line, condition: (str: string) => boolean) =>
  line.patterns.find(condition) ?? '';

const subsetk = (d: Decoded, num: number, b: string) =>
  subset(getKey(d, num), b);

const goB = (input: Line[]) => {
  return input.reduce((a, line) => {
    const d: Decoded = {};
    d[find(line, p => p.length == 2)] = 1;
    d[find(line, p => p.length == 3)] = 7;
    d[find(line, p => p.length == 4)] = 4;
    d[find(line, p => p.length == 7)] = 8;
    d[find(line, p => p.length == 5 && subsetk(d, 7, p))] = 3;
    d[find(line, p => p.length == 6 && subsetk(d, 3, p))] = 9;
    d[find(line, p => p.length == 6 && subsetk(d, 1, p) && !(p in d))] = 0;
    d[find(line, p => p.length == 6 && !(p in d)) ?? ''] = 6;
    d[find(line, p => p.length == 5 && count(getKey(d, 6), p) == 5)] = 5;
    d[find(line, p => p.length == 5 && !(p in d))] = 2;

    return (
      a +
      line.output.reduce(
        (acc, p, i) =>
          acc +
          d[
            Object.keys(d).find(
              key => key.length == p.length && subset(key, p)
            ) ?? ''
          ] *
            Math.pow(10, 3 - i),
        0
      )
    );
  }, 0);
};

/* Tests */

const testInput1 = prepareInput(`
acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`);
test(goA(testInput1), 0);
test(goB(testInput1), 5353);

const testInput2 = prepareInput(`
be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`);
test(goA(testInput2), 26);
test(goB(testInput2), 61229);

/* Results */

console.time('Time');
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd('Time');

console.log('Solution to part 1:', resultA);
console.log('Solution to part 2:', resultB);
