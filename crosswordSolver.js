const crosswordSolver = (puzzle, words) => {
  if (!isValidPuzzle(puzzle) || !isValidWordList(words)) return "Error";

  const grid = parsePuzzle(puzzle);
  let slots = identifyWordSlots(grid);

  if (slots.length !== words.length) return "Error";

  slots.sort((a, b) => b.length - a.length);

  const solution = solve(grid, slots, words);
  return solution ? solutionToString(solution) : "Error";
};

const identifyWordSlots = (grid) => {
  const slots = [];

  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (/^[12]$/.test(cell)) {
        if ((j === 0 || grid[i][j - 1] === '.') && (j + 1 < grid[i].length && grid[i][j + 1] !== '.')) {
          const horizontalSlot = findHorizontalSlot(grid, i, j);
          if (horizontalSlot) slots.push(horizontalSlot);
        }
        if ((i === 0 || grid[i - 1][j] === '.') && (i + 1 < grid.length && grid[i + 1][j] !== '.')) {
          const verticalSlot = findVerticalSlot(grid, i, j);
          if (verticalSlot) slots.push(verticalSlot);
        }
      }
    });
  });

  return slots;
};
