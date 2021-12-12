import { test, readInput } from '../utils/index';

interface Node {
  name: string;
  small: boolean;
  connected: Node[];
}

interface NodeList {
  [key: string]: Node;
}

const prepareInput = (rawInput: string) => {
  const input = rawInput
    .trim()
    .split('\n')
    .map(line => line.split('-'));
  const nodes: NodeList = {};
  input.forEach(line =>
    line.forEach(name => {
      nodes[name] = {
        name,
        small: name === name.toLowerCase(),
        connected: [],
      };
    })
  );
  input.forEach(line => {
    nodes[line[0]].connected.push(nodes[line[1]]);
    nodes[line[1]].connected.push(nodes[line[0]]);
  });
  return nodes;
};

const input = prepareInput(readInput('day12'));

const finderA = (entry: Node, visited: string[]) => {
  if (entry.name == 'end') {
    return 1;
  }

  let paths = 0;
  entry.connected.forEach(connection => {
    if (!connection.small || visited.every(name => name !== connection.name)) {
      paths += finderA(connection, [...visited, entry.name]);
    }
  });

  return paths;
};

const goA = (input: NodeList) => finderA(input['start'], []);

const finderB = (entry: Node, visited: string[], smallTwice: boolean) => {
  if (entry.name == 'end') {
    return 1;
  }

  let paths = 0;
  entry.connected.forEach(connection => {
    if (
      connection.name !== 'start' &&
      (!connection.small ||
        !smallTwice ||
        visited.every(name => name !== connection.name))
    ) {
      paths += finderB(
        connection,
        [...visited, entry.name],
        smallTwice ||
          (connection.small && visited.some(name => name === connection.name))
      );
    }
  });

  return paths;
};

const goB = (input: NodeList) => finderB(input['start'], [], false);

/* Tests */

const testInput1 = prepareInput(`
start-A
start-b
A-c
A-b
b-d
A-end
b-end`);
test(goA(testInput1), 10);
test(goB(testInput1), 36);

const testInput2 = prepareInput(`
dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`);
test(goA(testInput2), 19);
test(goB(testInput2), 103);

const testInput3 = prepareInput(`
fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`);
test(goA(testInput3), 226);
test(goB(testInput3), 3509);

/* Results */

console.time('Time');
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd('Time');

console.log('Solution to part 1:', resultA);
console.log('Solution to part 2:', resultB);
