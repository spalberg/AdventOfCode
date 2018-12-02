const fs = require("fs");
const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const ids = input.split("\n").map(l => l.trim());

function part1(ids) {
  let exactly2 = 0;
  let exactly3 = 0;

  ids.forEach(id => {
    const chars = [...id];
    const charsSet = new Set(chars);
    const numberOfDuplicates = new Set(
      [...charsSet].map(c1 => chars.filter(c2 => c1 === c2).length)
    );
    if (numberOfDuplicates.has(2)) exactly2++;
    if (numberOfDuplicates.has(3)) exactly3++;
  });

  console.log(`Result 1: ${exactly2 * exactly3}`);
}

function part2(ids) {
  const closeIds = new Set();
  ids.forEach((id, idIndex) => {
    const chars = [...id];
    for (let i = idIndex + 1; i < ids.length; i++) {
      const otherId = ids[i];
      const diff = chars.filter((c, i) => otherId.charAt(i) === c);
      if (diff.length === chars.length - 1) {
        closeIds.add(diff.join(''));
      }
    }
  });
  console.log(`Result 2: ${[...closeIds]}`);
}

part1(ids);
part2(ids);
