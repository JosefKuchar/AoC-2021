import { test, readInput } from '../utils/index';

interface Packet {
  version: number;
  type: number;
  value?: number;
  children: Packet[];
}

const parsePacket = (bin: string) => {
  let packet: Packet = {
    version: parseInt(bin.substring(0, 3), 2),
    type: parseInt(bin.substring(3, 6), 2),
    children: [],
  };
  let ending = 0;
  if (packet.type == 4) {
    let buffer = '';
    for (let i = 6; ; i += 5) {
      buffer += bin.substring(i + 1, i + 5);
      if (bin.charAt(i) == '0') {
        ending = i + 5;
        break;
      }
    }
    packet.value = parseInt(buffer, 2);
  } else {
    const lengthType = bin.charAt(6);
    if (lengthType == '0') {
      const length = parseInt(bin.substring(7, 22), 2);
      let start = 22;
      ending = start + length;
      while (true) {
        const newPacket = parsePacket(bin.substring(start, ending));
        packet.children.push(newPacket.data);
        start += newPacket.ending;
        if (start == ending) {
          break;
        }
      }
    } else {
      const count = parseInt(bin.substring(7, 18), 2);
      let start = 18;
      for (let i = 0; i < count; i++) {
        const newPacket = parsePacket(bin.substring(start));
        packet.children.push(newPacket.data);
        start += newPacket.ending;
      }
      ending = start;
    }
  }
  return { ending, data: packet };
};

const prepareInput = (rawInput: string) => {
  const hex = rawInput.trim().split('');
  const bin = hex.reduce(
    (buffer, digit) =>
      buffer + parseInt(digit, 16).toString(2).padStart(4, '0'),
    ''
  );
  return parsePacket(bin).data;
};

const input = prepareInput(readInput('day16'));

const goA = (input: Packet): number => {
  return (
    input.version + input.children.reduce((sum, packet) => sum + goA(packet), 0)
  );
};

const goB = (input: Packet): number => {
  switch (input.type) {
    case 0:
      return input.children.reduce((sum, packet) => sum + goB(packet), 0);
    case 1:
      return input.children.reduce((sum, packet) => sum * goB(packet), 1);
    case 2:
      return Math.min(...input.children.map(packet => goB(packet)));
    case 3:
      return Math.max(...input.children.map(packet => goB(packet)));
    case 4:
      return input.value ?? 0;
    case 5:
      return goB(input.children[0]) > goB(input.children[1]) ? 1 : 0;
    case 6:
      return goB(input.children[0]) < goB(input.children[1]) ? 1 : 0;
    case 7:
      return goB(input.children[0]) === goB(input.children[1]) ? 1 : 0;
    default:
      return NaN;
  }
};

/* Tests */

const testInput1 = prepareInput(`8A004A801A8002F478`);
test(goA(testInput1), 16);
const testInput2 = prepareInput(`620080001611562C8802118E34`);
test(goA(testInput2), 12);
const testInput3 = prepareInput(`C0015000016115A2E0802F182340`);
test(goA(testInput3), 23);
const testInput4 = prepareInput(`A0016C880162017C3686B18A3D4780`);
test(goA(testInput4), 31);

const testInput5 = prepareInput(`C200B40A82`);
test(goB(testInput5), 3);
const testInput6 = prepareInput(`04005AC33890`);
test(goB(testInput6), 54);
const testInput7 = prepareInput(`880086C3E88112`);
test(goB(testInput7), 7);
const testInput8 = prepareInput(`CE00C43D881120`);
test(goB(testInput8), 9);
const testInput9 = prepareInput(`D8005AC2A8F0`);
test(goB(testInput9), 1);
const testInput10 = prepareInput(`F600BC2D8F`);
test(goB(testInput10), 0);
const testInput11 = prepareInput(`9C005AC2F8F0`);
test(goB(testInput11), 0);
const testInput12 = prepareInput(`9C0141080250320F1802104A08`);
test(goB(testInput12), 1);

/* Results */

console.time('Time');
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd('Time');

console.log('Solution to part 1:', resultA);
console.log('Solution to part 2:', resultB);
