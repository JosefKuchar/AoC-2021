import { test, readInput } from '../utils/index';

interface Input {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

const prepareInput = (rawInput: string) => {
  const found = rawInput
    .match(/x=(-?\d+)..(-?\d+), y=(-?\d+)..(-?\d+)/)
    ?.map(Number);
  const [_, x1, x2, y1, y2] = found!;
  return { x1, x2, y1, y2 };
};

const input = prepareInput(readInput('day17'));

const simulate = (input: Input, velX: number, velY: number) => {
  let [posX, posY] = [0, 0];
  let maxY = 0;
  while (velY > 0 || posY >= input.y1) {
    posX += velX;
    posY += velY;
    if (posY > maxY) {
      maxY = posY;
    }
    if (velX > 0) {
      velX--;
    } else if (velX < 0) {
      velX++;
    }
    velY--;

    if (
      posX >= input.x1 &&
      posX <= input.x2 &&
      posY >= input.y1 &&
      posY <= input.y2
    ) {
      return maxY;
    }
  }
  return -1;
};

const goA = (input: Input) => {
  let max = -1;
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      const maxY = simulate(input, i, j);
      if (maxY > max) {
        max = maxY;
      }
    }
  }
  return max;
};

const goB = (input: Input) => {
  let count = 0;
  for (let i = 0; i < 1000; i++) {
    for (let j = -1000; j < 1000; j++) {
      const maxY = simulate(input, i, j);
      if (maxY > -1) {
        count++;
      }
    }
  }
  return count;
};

/* Tests */

const testInput = prepareInput(`target area: x=20..30, y=-10..-5`);
test(goA(testInput), 45);
test(goB(testInput), 112);

/* Results */

console.time('Time');
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd('Time');

console.log('Solution to part 1:', resultA);
console.log('Solution to part 2:', resultB);
