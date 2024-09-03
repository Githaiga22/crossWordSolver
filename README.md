# crosswordSolver

### Overview

The crosswordSolver.js module provides a function, crosswordSolver, designed to solve a crossword puzzle by filling in words from a given list. This function processes an empty crossword grid and attempts to place words into the grid according to specified rules, ensuring a unique solution if possible.

### Parameters

- puzzle: A string representing the empty crossword puzzle. The format is such that:
        Each character is either a number, a dot (.), or a newline (\n).
        Numbers represent the count of words starting at that position.
        Dots (.) represent spaces that do not need to be filled.

- words: An array of strings where each string is a word to be placed into the puzzle. The list must contain unique words.

## Algorithm
1. Input Validation

    isValidPuzzle(puzzle): Checks if the puzzle string is valid by ensuring it's non-empty, correctly formatted, and consists only of valid characters (0-2, ., \n).
    isValidWordList(words): Ensures that the words array is valid by verifying it's a non-empty array of unique words containing only alphabetic characters.

2. Parsing and Setup

    parsePuzzle(puzzle): Converts the puzzle string into a 2D grid for easier manipulation.
    identifyWordSlots(grid): Scans the grid to find potential slots where words can be placed. Slots are identified horizontally and vertically based on the numbers in the grid.

3. Slot Identification

    findHorizontalSlot(grid, i, j): Identifies a horizontal slot starting at position (i, j) and determines its length.
    findVerticalSlot(grid, i, j): Identifies a vertical slot starting at position (i, j) and determines its length.

4. Solving the Puzzle

    solve(grid, slots, words): Uses a backtracking approach to attempt to fill the identified slots with the given words:
        backtrack(index): Recursively tries to place words into the slots. If a solution is found, it is stored and checked for uniqueness.
        canPlaceWord(grid, slot, word): Checks if a word can be placed into a given slot without conflicts.
        placeWord(grid, slot, word): Places a word into a slot.
        removeWord(grid, slot): Removes a word from a slot if a backtrack step is required.

5. Output

    solutionToString(solution): Converts the filled grid back into a string format for output.

 6. Error Handling

    If the puzzle is invalid or the solution is not unique, the function returns "Error"

### Example
```bash    
const emptyPuzzle = `2001
0..0
1000
0..0`;
const words = ['casa', 'alan', 'ciao', 'anta'];

console.log(crosswordSolver(emptyPuzzle, words));

// Expected Output:
// casa
// i..l
// anta
// o..n
```

### Detailed Explanation

1. Input Validation: Ensures both the puzzle and the list of words are valid. This includes format checking and uniqueness of words.

2. Parsing: Converts the puzzle from a string into a 2D grid representation. This simplifies the process of identifying and working with slots.

3. Slot Identification: Finds all potential slots for words by scanning each cell in the grid. This involves checking both horizontal and vertical directions.

4. Backtracking Algorithm:
    - Recursive Placement: Attempts to place each word into the identified slots using a recursive backtracking approach.
    - Uniqueness Check: If multiple solutions are found, it returns "Error". If exactly one solution is found, it returns the solved puzzle.

5. Conversion to Output: The final grid is converted back to the required string format for output.

## Authors
- allkamau