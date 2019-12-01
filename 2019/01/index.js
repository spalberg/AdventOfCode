const input = require('fs')
  .readFileSync('./input.txt')
  .toString();
const masses = input
  .split('\n')
  .filter(Boolean)
  .map(n => parseInt(n, 10));

const calculate = n => Math.floor(n / 3) - 2;

const requiredFuel = masses.map(calculate).reduce((acc, n) => acc + n, 0);
console.log(`Part 1: ${requiredFuel}`);

const calculateFuelForFuel = fuel => {
  let fuelForFuel = fuel;
  let total = 0;
  while (true) {
    fuelForFuel = calculate(fuelForFuel);
    if (fuelForFuel <= 0) break;
    total += fuelForFuel;
  }
  return total;
};
const requiredFuelWithFuel = masses
  .map(n => {
    const fuelForModule = calculate(n);
    const fuelForFuel = calculateFuelForFuel(fuelForModule);
    return fuelForModule + fuelForFuel;
  })
  .reduce((acc, n) => acc + n, 0);
console.log(`Part 2: ${requiredFuelWithFuel}`);
