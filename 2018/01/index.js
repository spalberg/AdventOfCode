const fs = require('fs');
const input = fs.readFileSync('./input.txt', { encoding: 'utf8' });

const changes = input
  .split('\n')
  .map(l => l.trim())
  .map(l => parseInt(l))

// Part 1
const part1 = changes.reduce((a, b) => a + b, 0);
console.log(`Result 1: ${part1}`);

// Part 2
const frequencies = new Set();
let freq = 0;
for (let i = 0; i < changes.length; i++) {
  freq += changes[i];

  if (frequencies.has(freq)) {
    console.log(`Result 2: ${freq}`);
    process.exit();
  }

  frequencies.add(freq);
  
  if (i === changes.length - 1) {
    i = -1;
  }
}
