import fs from "fs";

function solvePuzzle1(entries: number[]) {
  const elves: number[] = [];
  let totalCalories = 0;

  entries.forEach((calories: number) => {
    if (calories > 0) {
      totalCalories += calories;
    } else {
      elves.push(totalCalories);
      totalCalories = 0;
    }
  });

  return Math.max(...elves);
}

function solvePuzzle2(entries: number[]) {
  const elves: number[] = [];
  let totalCalories = 0;

  entries.forEach((calories: number, index) => {
    totalCalories += calories;

    if (calories === 0 || index === entries.length - 1) {
      elves.push(totalCalories);
      totalCalories = 0;
    }
  });

  const top3 = elves.sort((a, b) => a - b).slice(elves.length - 3);

  return top3.reduce((total, number) => total + number, 0);
}

const file: string = fs.readFileSync("./src/day1/input.txt", "utf8");
const entries = file.split("\n").map((n) => Number(n));

const p1 = solvePuzzle1(entries);
const p2 = solvePuzzle2(entries);

// 66616, 199172
console.log({ p1, p2 });
