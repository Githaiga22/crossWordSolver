function crosswordSolver(emptyPuzzle, words) {
    // Parse the puzzle
    const rows = emptyPuzzle.split('\n');
    const height = rows.length;
    const width = rows[0].length;
    const grid = rows.map(row => row.split(''));

    // Find word start positions
    const wordStarts = [];
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (grid[i][j] !== '.' && grid[i][j] !== '0') {
                const count = parseInt(grid[i][j]);
                for (let k = 0; k < count; k++) {
                    wordStarts.push({ row: i, col: j, direction: k === 0 ? 'across' : 'down' });
                }
            }
        }
    }

    // Validate input
    if (wordStarts.length !== words.length) {
        console.log('Error');
        return;
    }

    // Sort words by length (descending)
    words.sort((a, b) => b.length - a.length);

    // Try to solve the puzzle
    if (solvePuzzle(grid, wordStarts, words)) {
        console.log(grid.map(row => row.join('')).join('\n'));
    } else {
        console.log('Error');
    }
}

function solvePuzzle(grid, wordStarts, words, index = 0) {
    if (index === words.length) return true;

    const word = words[index];
    for (const start of wordStarts) {
        if (canPlaceWord(grid, word, start)) {
            placeWord(grid, word, start);
            if (solvePuzzle(grid, wordStarts, words, index + 1)) {
                return true;
            }
            removeWord(grid, word, start);
        }
    }

    return false;
}

function canPlaceWord(grid, word, start) {
    const { row, col, direction } = start;
    const [dRow, dCol] = direction === 'across' ? [0, 1] : [1, 0];

    for (let i = 0; i < word.length; i++) {
        const r = row + i * dRow;
        const c = col + i * dCol;
        if (r >= grid.length || c >= grid[0].length) return false;
        if (grid[r][c] !== '.' && grid[r][c] !== word[i] && isNaN(grid[r][c])) return false;
    }

    return true;
}

function placeWord(grid, word, start) {
    const { row, col, direction } = start;
    const [dRow, dCol] = direction === 'across' ? [0, 1] : [1, 0];

    for (let i = 0; i < word.length; i++) {
        grid[row + i * dRow][col + i * dCol] = word[i];
    }
}

function removeWord(grid, word, start) {
    const { row, col, direction } = start;
    const [dRow, dCol] = direction === 'across' ? [0, 1] : [1, 0];

    for (let i = 0; i < word.length; i++) {
        const r = row + i * dRow;
        const c = col + i * dCol;
        if (isNaN(grid[r][c])) grid[r][c] = '.';
    }
}

// Example usage
const emptyPuzzle = `2001
0..0
1000
0..0`;
const words = ['casa', 'alan', 'ciao', 'anta'];

crosswordSolver(emptyPuzzle, words);