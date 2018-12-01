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
let i = 0;
while (true) {
  freq += changes[i];
  if (frequencies.has(freq)) break;
  frequencies.add(freq);
  i = (i + 1) % changes.length;
}
console.log(`Result 2: ${freq}`);
