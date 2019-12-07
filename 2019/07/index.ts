import { getTape, processTape, processTapeUntilOutput } from '../05';

const perm = <T>(a: T[]): T[][] =>
  a.length
    ? a.reduce(
        (r, v, i) => [
          ...r,
          ...perm([...a.slice(0, i), ...a.slice(i + 1)]).map(x => [v, ...x]),
        ],
        [],
      )
    : [[]];

function solvePart1() {
  const tape = getTape();
  let currentMax = -1;
  for (const phaseSettings of perm([0, 1, 2, 3, 4])) {
    let input = 0;
    for (const setting of phaseSettings) {
      const output = processTape(tape.slice(), [setting, input]);
      input = output.pop();
    }
    if (input > currentMax) {
      currentMax = input;
    }
  }
  console.log(`Part 1: ${currentMax}`);
}

function solvePart2() {
  let currentMax = -1;
  for (const phaseSettings of perm([5, 6, 7, 8, 9])) {
    const amplifiers: [number[], number][] = [
      [getTape(), 0],
      [getTape(), 0],
      [getTape(), 0],
      [getTape(), 0],
      [getTape(), 0],
    ];
    let firstLoop = true;
    let input = 0;
    OuterLoop: while (true) {
      for (let i = 0; i < phaseSettings.length; i += 1) {
        const [tape, position] = amplifiers[i];
        const {
          halted,
          position: newPosition,
          output,
        } = processTapeUntilOutput(
          position,
          tape,
          firstLoop ? [phaseSettings[i], input] : [input],
          [],
        );
        if (halted) {
          break OuterLoop;
        }
        amplifiers[i] = [tape, newPosition];
        input = output.pop();
      }
      firstLoop = false;
    }

    if (input > currentMax) {
      currentMax = input;
    }
  }
  console.log(`Part 2: ${currentMax}`);
}

// solvePart1();
// solvePart2();
