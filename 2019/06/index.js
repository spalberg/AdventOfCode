function getParsedInput() {
  return require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split('\n')
    .map(n => n.split(')'));
}

const input = getParsedInput();
const objects = new Set(input.flat());
const orbits = new Map(
  input.map(([isOrbitted, isOrbittedBy]) => [isOrbittedBy, isOrbitted]),
);

function solvePart1() {
  let count = 0;
  for (const object of objects) {
    let currentObject = object;
    while ((currentObject = orbits.get(currentObject)) != null) {
      count += 1;
    }
  }

  console.log(`Part 1: ${count}`);
}

function bfs(graph, startNode, endNode, lastNode = null, cost = 0) {
  const nodes = graph.get(startNode);
  if (nodes.length === 0) return -1;
  for (const node of nodes) {
    if (node === endNode) return cost + 1;
    if (node === lastNode) continue;
    const pathCost = bfs(graph, node, endNode, startNode, cost + 1);
    if (pathCost != -1) return pathCost;
  }
  return -1;
}

function solvePart2() {
  const graph = new Map([...objects].map(object => [object, []]));
  input.forEach(([k, v]) => graph.get(k).push(v));
  for ([k, v] of orbits.entries()) {
    graph.get(k).push(v);
  }

  const result = bfs(graph, orbits.get('YOU'), orbits.get('SAN'));
  console.log(`Part 2: ${result}`);
}

solvePart1();
solvePart2();
