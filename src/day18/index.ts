import { test, readInput } from '../utils/index';
import { inspect } from 'util';

interface Pair {
  data: (Pair | number)[];
  parent?: Pair;
}

const prepareInput = (rawInput: string) =>
  rawInput
    .trim()
    .split('\n')
    .map(line => {
      let root: Pair = { data: [] };
      let current = root;
      line.split('').forEach(char => {
        switch (char) {
          case '[':
            const pair = { data: [], parent: current };
            current.data.push(pair);
            current = pair;
            break;
          case ']':
            current = current.parent!;
            break;
          case ',':
            break;
          default:
            current.data.push(parseInt(char));
            break;
        }
      });
      root = root.data[0] as Pair;
      root.parent = undefined;
      return root;
    });

const input = prepareInput(readInput('day18'));

const printPair = (pair: Pair) => {
  let buffer = '[';
  pair.data.forEach((child, i) => {
    if (typeof child !== 'number') {
      buffer += printPair(child);
    } else {
      buffer += child;
    }
    buffer += i == 0 ? ',' : '';
  });
  buffer += ']';
  return buffer;
};

const addPairs = (a: Pair, b: Pair) => {
  const pair = { data: [a, b] };
  a.parent = pair;
  b.parent = pair;
  return pair;
};

const goA = (input: Pair[]) => {
  console.log(addPairs(input[0], input[1]).data);
  console.log(printPair(input[0]));
  console.log(printPair(addPairs(input[0], input[1])));
  return 0;
};

const goB = (input: any) => {
  return;
};

/* Tests */

const testInput = prepareInput(`
[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`);
test(goA(testInput), 4140);
//test(goB(testInput), 112);

/* Results */

console.time('Time');
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd('Time');

console.log('Solution to part 1:', resultA);
console.log('Solution to part 2:', resultB);
