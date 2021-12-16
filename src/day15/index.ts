import { test, readInput } from '../utils/index';

interface StringMap {
  [key: string]: number;
}

interface QueueNode {
  x: number;
  y: number;
  distance: number;
}

const dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const prepareInput = (rawInput: string) =>
  rawInput
    .trim()
    .split('\n')
    .map(line => line.split('').map(Number));

const input = prepareInput(readInput('day15'));

const goA = (input: number[][]) => {
  let distances: StringMap = {};
  const queue: QueueNode[] = [];
  input.forEach((line, i) =>
    line.forEach((_, j) => {
      distances[`${i}-${j}`] = Infinity;
    })
  );
  distances['0-0'] = 0;
  queue.push({ x: 0, y: 0, distance: 0 });
  while (queue.length != 0) {
    const minNode = queue.pop()!;
    dirs.forEach(dir => {
      let coords = `${dir[0] + minNode.x}-${dir[1] + minNode.y}`;
      if (typeof distances[coords] !== 'undefined') {
        let alt =
          distances[`${minNode.x}-${minNode.y}`] +
          input[dir[0] + minNode.x][dir[1] + minNode.y];
        if (alt < distances[coords]) {
          distances[coords] = alt;
          queue.push({
            x: dir[0] + minNode.x,
            y: dir[1] + minNode.y,
            distance: distances[coords],
          });
          queue.sort((a, b) => b.distance - a.distance);
        }
      }
    });
  }

  return distances[`${input.length - 1}-${input[0].length - 1}`];
};

const goB = (input: number[][]) => {
  const newInput = Array(input.length * 5)
    .fill(0)
    .map(() => Array(input.length * 5).fill(-1));
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      for (let x = 0; x < input.length; x++) {
        for (let y = 0; y < input.length; y++) {
          let newWeight = input[x][y];
          for (let k = 0; k < i + j; k++) {
            newWeight++;
            if (newWeight >= 10) {
              newWeight = 1;
            }
          }
          newInput[x + input.length * i][y + input.length * j] =
            newWeight === 0 ? 1 : newWeight;
        }
      }
    }
  }
  return goA(newInput);
};

/* Tests */

const testInput = prepareInput(`
1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`);

test(goA(testInput), 40);
test(goB(testInput), 315);

/* Results */

console.time('Time');
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd('Time');

console.log('Solution to part 1:', resultA);
console.log('Solution to part 2:', resultB);
