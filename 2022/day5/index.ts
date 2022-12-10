import fs from "fs";

function getStacks(entries: string[]) {
  const stackIndex = entries.findIndex((e) => e.includes("1"));
  const stackInput = entries
    .slice(0, stackIndex)
    .reverse()
    .map((line) => line.split(""));

  const stacks: string[][] = [];

  stackInput.forEach((input, index) => {
    input.forEach((char: string, i: number) => {
      if (char.match(/[A-Z]/)) {
        stacks[i] = stacks[i] || [];
        stacks[i][index] = char;
      }
    });
  });

  return stacks.filter(Boolean);
}

function getMoves(entries: string[]) {
  const lines = entries.slice(entries.findIndex((e) => e === "") + 1);
  const moves = lines.map((line) => line.match(/\d+/g)!.map(Number));

  return moves;
}

function move(stacks: string[][], moves: number[][]) {
  return function ({ reverse }: { reverse: boolean }) {
    const items = JSON.parse(JSON.stringify(stacks));

    moves.forEach((move) => {
      const [num, from, to] = move;
      const moved = items[from - 1].splice(items[from - 1].length - num, num);
      const deletedItems = reverse ? moved.reverse() : moved;

      items[to - 1].push(...deletedItems);
    });

    return items.map((s: string[]) => s.pop()).join("");
  };
}

const file: string = fs.readFileSync("./src/day5/input.txt", "utf8");
const entries = file.split("\n");
const moveStacks = move(getStacks(entries), getMoves(entries));

const p1 = moveStacks({ reverse: true });
const p2 = moveStacks({ reverse: false });

console.log({ p1, p2 });
