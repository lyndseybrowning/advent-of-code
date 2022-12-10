import fs from "fs";

interface Player {
  beats: string;
  draws: string;
  score: number;
}

const rock: Player = {
  beats: "C",
  draws: "A",
  score: 1
};

const paper: Player = {
  beats: "A",
  draws: "B",
  score: 2
};

const scissors: Player = {
  beats: "B",
  draws: "C",
  score: 3
};

const players = {
  A: rock,
  B: paper,
  C: scissors,
  X: rock,
  Y: paper,
  Z: scissors
};

const outcomes = {
  win: 6,
  draw: 3,
  lose: 0
};

function solvePuzzle1(entries: string[]) {
  const totalScore = entries.reduce((score: number, entry) => {
    const [player1, player2] = entry.split(" ");
    const player = players[player2 as keyof typeof players];

    if (player.beats === player1) {
      score += outcomes.win;
    } else if (player.draws === player1) {
      score += outcomes.draw;
    }

    return score + player.score;
  }, 0);

  return totalScore;
}

function solvePuzzle2(entries: string[]) {
  const totalScore = entries.reduce((score: number, entry) => {
    const [player1, player2] = entry.split(" ");

    const p1 = player1 as keyof typeof players;

    if (player2 === "X") {
      const losingScore =
        players[players[p1].beats as keyof typeof players].score;
      return score + losingScore + outcomes.lose;
    }

    if (player2 === "Y") {
      const drawingScore = players[p1].score;
      return score + drawingScore + outcomes.draw;
    }

    const winningPlayer: Player = [rock, paper, scissors].find(
      (p) => p.beats === p1
    )!;

    return score + winningPlayer.score + outcomes.win;
  }, 0);

  return totalScore;
}

const file: string = fs.readFileSync("./src/day2/input.txt", "utf8");
const entries = file.split("\n");

const p1 = solvePuzzle1(entries);
const p2 = solvePuzzle2(entries);

console.log({ p1, p2 });
