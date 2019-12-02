const input =
  '1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,6,1,19,1,19,10,23,2,13,23,27,1,5,27,31,2,6,31,35,1,6,35,39,2,39,9,43,1,5,43,47,1,13,47,51,1,10,51,55,2,55,10,59,2,10,59,63,1,9,63,67,2,67,13,71,1,71,6,75,2,6,75,79,1,5,79,83,2,83,9,87,1,6,87,91,2,91,6,95,1,95,6,99,2,99,13,103,1,6,103,107,1,2,107,111,1,111,9,0,99,2,14,0,0';
const tape = input.split(',').map(n => parseInt(n, 10));

function processTape(originalTape) {
  const tape = Array.from(originalTape);
  let position = 0;
  let opcode = -1;
  while (true) {
    opcode = tape[position];
    switch (opcode) {
      case 99:
        return tape;
      case 1:
        tape[tape[position + 3]] =
          tape[tape[position + 1]] + tape[tape[position + 2]];
        break;
      case 2:
        tape[tape[position + 3]] =
          tape[tape[position + 1]] * tape[tape[position + 2]];
        break;
      default:
        throw new Error(`Invalid opcode: ${opcode}`);
    }
    position += 4;
  }
}

const part1Tape = Array.from(tape);
part1Tape[1] = 12;
part1Tape[2] = 2;
const processedTape = processTape(part1Tape);
console.log(`Part 1: ${processedTape[0]}`);

function bruteForceResult(originalTape, result) {
  for(let noun = 0; noun < 100; noun += 1) {
    for (let verb = 0; verb < 100; verb += 1) {
      const tape = Array.from(originalTape);
      tape[1] = noun;
      tape[2] = verb;

      try {
        const processedTape = processTape(tape);
        if (processedTape[0] === result) {
          return 100 * noun + verb;
        }
        continue;
      }
      catch(e) {
        continue;
      }
    }
  }
}

const bruteForcedResult = bruteForceResult(tape, 19690720)
console.log(bruteForcedResult);
