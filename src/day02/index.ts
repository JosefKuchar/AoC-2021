import { test, readInput } from '../utils/index';

interface Command {
  dir: string;
  val: number;
}

const prepareInput = (rawInput: string) =>
  rawInput
    .trim()
    .split('\n')
    .map(line => {
      const parts = line.split(' ');
      return {
        dir: parts[0],
        val: parseInt(parts[1]),
      };
    });

const input = prepareInput(readInput('day02'));

const goA = (input: Command[]) => {
  let [x, y] = [0, 0];
  input.forEach(command => {
    switch (command.dir) {
      case 'forward':
        x += command.val;
        break;
      case 'down':
        y += command.val;
        break;
      case 'up':
        y -= command.val;
        break;
    }
  });
  return x * y;
};

const goB = (input: Command[]) => {
  let [x, y, aim] = [0, 0, 0];
  input.forEach(command => {
    switch (command.dir) {
      case 'forward':
        x += command.val;
        y += command.val * aim;
        break;
      case 'down':
        aim += command.val;
        break;
      case 'up':
        aim -= command.val;
        break;
    }
  });
  return x * y;
};

/* Tests */

const testInput = prepareInput(`
forward 5
down 5
forward 8
up 3
down 8
forward 2`);

test(goA(testInput), 150);
test(goB(testInput), 900);

/* Results */

console.time('Time');
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd('Time');

console.log('Solution to part 1:', resultA);
console.log('Solution to part 2:', resultB);
