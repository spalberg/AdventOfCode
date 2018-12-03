const fs = require("fs");
const input = fs.readFileSync("./input.txt", { encoding: "utf-8" });

const regex = /\#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;
const data = input
  .split("\n")
  .map(l => l.match(regex))
  .map(([s, id, x, y, w, h]) => ({
    id: parseInt(id),
    x: parseInt(x),
    y: parseInt(y),
    w: parseInt(w),
    h: parseInt(h)
  }));

function getArea({ x, y, w, h }) {
  const area = [];
  for (let xi = x; xi < x + w; xi++) {
    for (let yi = y; yi < y + h; yi++) {
      area.push([xi, yi]);
    }
  }
  return area;
}

const getKey = ([x, y]) => `${x}-${y}`;

/**
 * TODO refactor. this is slow af.
 */
function part1(data) {
  const points = data.reduce((arr, rec) => [...arr, ...getArea(rec)], []);
  const countMap = new Map();
  points.forEach(point => {
    const key = getKey(point);
    if (countMap.has(key)) {
      countMap.set(key, countMap.get(key) + 1);
    } else {
      countMap.set(key, 1);
    }
  });
  const sqinches = [...countMap.values()].filter(cm => cm > 1).length;
  
  console.log(`Result 1: ${sqinches}`);
}

function part2(data) {
  console.log(`Result 2: ${0}`);
}

part1(data);
part2(data);
