// @ts-ignore
const input: string = require('fs')
  .readFileSync('./input.txt')
  .toString();

const tape = input.split(',').map(n => parseInt(n, 10));

function processInstruction(
  instruction: number,
  tape: number[],
  position: number,
) {
  const opcode = instruction % 100;
  const parameterMode1 = Math.floor((instruction % 1000) / 100);
  const parameterValue1 = tape[position + 1];
  const parameterMode2 = Math.floor((instruction % 10000) / 1000);
  const parameterValue2 = tape[position + 2];
  const parameters = [
    parameterMode1 === 0 ? tape[parameterValue1] : parameterValue1,
    parameterMode2 === 0 ? tape[parameterValue2] : parameterValue2,
  ];
  return { opcode, parameters };
}

function processTape(tape: number[], inputs: number[]): number[] {
  let position = 0;
  const output = [];
  while (true) {
    const { opcode, parameters } = processInstruction(
      tape[position],
      tape,
      position,
    );
    switch (opcode) {
      case 99:
        return output;
      case 1:
        tape[tape[position + 3]] = parameters[0] + parameters[1];
        position += 4;
        continue;
      case 2:
        tape[tape[position + 3]] = parameters[0] * parameters[1];
        position += 4;
        continue;
      case 3:
        tape[tape[position + 1]] = inputs.splice(0, 1)[0];
        position += 2;
        continue;
      case 4:
        output.push(parameters[0]);
        position += 2;
        continue;
      case 5:
        position = parameters[0] != 0 ? parameters[1] : position + 3;
        continue;
      case 6:
        position = parameters[0] == 0 ? parameters[1] : position + 3;
        continue;
      case 7:
        tape[tape[position + 3]] = parameters[0] < parameters[1] ? 1 : 0;
        position += 4;
        continue;
      case 8:
        tape[tape[position + 3]] = parameters[0] === parameters[1] ? 1 : 0;
        position += 4;
        continue;
      default:
        throw new Error(`Invalid opcode: ${opcode}`);
    }
  }
}

const output1 = processTape(tape.slice(), [1]);
console.log(`Part 1: ${output1.pop()}`);

const output2 = processTape(tape.slice(), [5]);
console.log(`Part 2: ${output2.pop()}`);
