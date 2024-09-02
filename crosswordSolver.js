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

const findHorizontalSlot = (grid, i, j) => {
    let length = 0;
    while (j + length < grid[i].length && grid[i][j + length] !== '.') {
      length++;
    }
    return length > 1 ? { row: i, col: j, length, isHorizontal: true } : null;
  };
  
  const findVerticalSlot = (grid, i, j) => {
    let length = 0;
    while (i + length < grid.length && grid[i + length][j] !== '.') {
      length++;
    }
    return length > 1 ? { row: i, col: j, length, isHorizontal: false } : null;
  };
  
  const isValidPuzzle = (puzzle) =>
    typeof puzzle === 'string' &&
    puzzle.trim() !== '' &&
    puzzle
      .trim()
      .split('\n')
      .every((line, _, lines) => line.length === lines[0].length && /^[012.\n]+$/.test(line));
  
  const isValidWordList = (words) =>
    Array.isArray(words) &&
    words.length > 0 &&
    new Set(words).size === words.length &&
    words.every((word) => /^[a-zA-Z]+$/.test(word));
  
  const parsePuzzle = (puzzle) => puzzle.trim().split('\n').map((line) => line.split(''));
  
  const solve = (grid, slots, words) => {
    let solutions = 0;
    let finalSolution = null;
    const usedWords = new Set();
  
    const backtrack = (index) => {
      if (index === slots.length) {
        solutions++;
        if (solutions > 1) return true;
        finalSolution = JSON.parse(JSON.stringify(grid));
        return false;
      }
  
      const currentSlot = slots[index];
      for (let word of words) {
        if (usedWords.has(word) || word.length !== currentSlot.length) continue;
  
        if (canPlaceWord(grid, currentSlot, word)) {
          placeWord(grid, currentSlot, word);
          usedWords.add(word);
  
          if (backtrack(index + 1)) return true;
  
          removeWord(grid, currentSlot);
          usedWords.delete(word);
        }
      }
  
      return false;
    };
  
    backtrack(0);
    return solutions === 1 ? finalSolution : null;
  };
  
  const canPlaceWord = (grid, slot, word) => {
    for (let i = 0; i < word.length; i++) {
      const row = slot.isHorizontal ? slot.row : slot.row + i;
      const col = slot.isHorizontal ? slot.col + i : slot.col;
      const currentCell = grid[row][col];
  
      if (currentCell !== '.' && currentCell !== word[i] && !/^[012]$/.test(currentCell)) return false;
    }
    return true;
  };
  
  const placeWord = (grid, slot, word) => {
    for (let i = 0; i < word.length; i++) {
      const row = slot.isHorizontal ? slot.row : slot.row + i;
      const col = slot.isHorizontal ? slot.col + i : slot.col;
      grid[row][col] = word[i];
    }
  };
  
  const removeWord = (grid, slot) => {
    for (let i = 0; i < slot.length; i++) {
      const row = slot.isHorizontal ? slot.row : slot.row + i;
      const col = slot.isHorizontal ? slot.col + i : slot.col;
      grid[row][col] = grid[row][col] === '.' ? '.' : i === 0 ? slot.length.toString() : '0';
    }
  };
  
  const solutionToString = (solution) => solution.map((row) => row.join('')).join('\n');
  
  // Test
  const puzzle = '2001\n0..0\n1000\n0..0';
  const words = ['casa', 'alan', 'ciao', 'anta'];
  console.log(crosswordSolver(puzzle, words));
  
  