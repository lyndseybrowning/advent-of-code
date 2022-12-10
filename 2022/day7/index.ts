import fs from "fs";

interface Directory {
  name: string;
  files: number;
  children: Directory[];
}

function calculateDirectorySize(directory: Directory) {
  const sizes: number[] = [];

  const findSize = (directory: Directory) => {
    let size = directory.files;

    directory.children.forEach((child) => {
      size += findSize(child);
    });

    sizes.push(size);

    return size;
  };

  findSize(directory);

  return sizes;
}

function solvePuzzle1(fileSystem: Directory[]) {
  const MAX_SIZE = 100000;

  const totalFileSizes = fileSystem.reduce((fileSizes, directory) => {
    const fileSize = calculateDirectorySize(directory).filter(
      (size) => size < MAX_SIZE
    );

    return fileSizes + fileSize.reduce((total, file) => total + file, 0);
  }, 0);

  // 1443806
  return totalFileSizes;
}

function solvePuzzle2(fileSystem: Directory[], totalFiles: number) {
  const MAX_DISK_SIZE = 70000000;
  const MIN_SPACE_REQUIRED = 30000000;

  const usedSpace = MAX_DISK_SIZE - totalFiles;
  const minSpaceRequired = MIN_SPACE_REQUIRED - usedSpace;

  const fileSizes = fileSystem
    .reduce((fileSizes: number[], directory: Directory) => {
      const directorySizes = calculateDirectorySize(directory);
      return [...fileSizes, ...directorySizes];
    }, [])
    .sort((a, b) => a - b);

  const itemToDelete = fileSizes.find((file) => file >= minSpaceRequired);

  // 942298
  return itemToDelete;
}

function buildFileSystem(entries: string[]) {
  const fileSystem: Directory[] = [];
  let workingDirectory: string[] = [];
  let totalFilesInRoot: number = 0;

  const getCurrentDirectory = (
    path: string[] = workingDirectory,
    files: Directory[] = fileSystem
  ): Directory => {
    const dir = files.find((file) => file.name === path[0])!;

    if (path.length === 1) {
      return dir;
    }

    return getCurrentDirectory([...path.slice(1)], dir.children);
  };

  const createDirectory = (name: string) => {
    const directory: Directory = {
      name,
      files: 0,
      children: []
    };

    if (workingDirectory.length === 1) {
      fileSystem.push(directory);
    } else {
      const subDirectory = getCurrentDirectory([...workingDirectory.slice(1)]);
      subDirectory.children.push(directory);
    }
  };

  const getDirectoryName = (entry: string, regex = "$ cd") => {
    return entry.split(regex)[1].trim();
  };

  const addFile = (size: number) => {
    totalFilesInRoot += size;

    const cwd = [...workingDirectory.slice(1)];

    if (cwd.length === 0) {
      return;
    }
    const directory = getCurrentDirectory(cwd);

    if (directory) {
      directory.files += size;
    }
  };

  const setWorkingDirectory = (directoryName: string) => {
    if (directoryName === "..") {
      workingDirectory = workingDirectory.slice(0, workingDirectory.length - 1);
    } else {
      workingDirectory = [...workingDirectory, directoryName];
    }
  };

  entries.forEach((entry: string) => {
    if (entry.includes("dir")) {
      createDirectory(getDirectoryName(entry, " "));
    } else if (entry.includes("$ cd")) {
      setWorkingDirectory(getDirectoryName(entry));
    } else if (entry.match(/\d/)) {
      addFile(Number(entry.split(" ")[0]));
    }
  });

  return { fileSystem, totalFilesInRoot };
}

const file: string = fs.readFileSync("./src/day7/input.txt", "utf8");
const entries = file.split("\n");
const { fileSystem, totalFilesInRoot } = buildFileSystem(entries);

const p1 = solvePuzzle1(fileSystem);
const p2 = solvePuzzle2(fileSystem, totalFilesInRoot);

console.log({ p1, p2 });