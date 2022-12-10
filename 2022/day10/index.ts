import fs from "fs";

function solvePuzzle1(program: string[]) {
  const cycles = [20, 60, 100, 140, 180, 220];
  const executions: number[] = [1];

  let x: number = 1;

  for (let i = 0; i < program.length; i++) {
    const [command, arg] = program[i].split(" ");

    if (command === "noop") {
      executions.push(x);
    } else if (arg) {
      x += Number(arg);
      executions.push(x, x);
    }
  }

  const signals = cycles.map((cycle) => cycle * executions[cycle - 2]);
  const signalStrength = signals.reduce((total, num) => total + num, 0);

  return signalStrength;
}

function solvePuzzle2(program: string[]) {
  const executions: string[] = program
    .reduce((executions: string[], line: string) => {
      if (line === "noop") {
        return [...executions, line];
      }
      return [...executions, "noop", line];
    }, [])
    .filter(Boolean);

  const LINE_LENGTH = 40;
  const CRT = [];

  let x: number = 1;

  for (let cycle = 0; cycle < executions.length; cycle++) {
    const [, arg] = executions[cycle].split(" ");
    const line = Math.floor(cycle / LINE_LENGTH);

    if (!CRT[line]) {
      CRT[line] = Array(LINE_LENGTH).fill(".");
    }

    if (
      cycle - line * LINE_LENGTH >= x - 1 &&
      cycle - line * LINE_LENGTH <= x + 1
    ) {
      CRT[line][cycle - line * LINE_LENGTH] = "#";
    }

    if (arg) {
      x += Number(arg);
    }
  }

  return CRT;
}

const file: string = fs.readFileSync("./src/day10/input.txt", "utf8");
const entries = file.split("\n");

const p1 = solvePuzzle1(entries);
const p2 = solvePuzzle2(entries);

// PZULBAUA
console.log({ p1, p2 });
