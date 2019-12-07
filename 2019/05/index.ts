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

export function processTapeUntilOutput(
  position: number,
  tape: number[],
  inputs: number[],
  output: number[],
) {
  while (true) {
    const { opcode, parameters } = processInstruction(
      tape[position],
      tape,
      position,
    );
    switch (opcode) {
      case 99:
        return { position, output, halted: true };
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
        return { position, output, halted: false };
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

export function processTape(tape: number[], inputs: number[]): number[] {
  let position = 0;
  let output = [];

  while (true) {
    const {
      halted,
      output: newOutput,
      position: newPosition,
    } = processTapeUntilOutput(position, tape, inputs, output);
    position = newPosition;
    output = newOutput;

    if (halted) {
      return output;
    }
  }
}

export function getTape() {
  // @ts-ignore
  const input: string = require('fs')
    .readFileSync('./input.txt')
    .toString();

  return input.split(',').map(n => parseInt(n, 10));
}

function solvePart1() {
  const output1 = processTape(getTape(), [1]);
  console.log(`Part 1: ${output1.pop()}`);
}

function solvePart2() {
  const output2 = processTape(getTape(), [5]);
  console.log(`Part 2: ${output2.pop()}`);
}

// solvePart1();
// solvePart2();
