const SUDOKU_ROW_LENGTH = 9;

// Returns an array of rows containing the sudoku digits
// Parses as integer to validate as number on client
const parseSudoku = (sudokuString: string) => {
  const sudokuGrid: number[][] = [];

  for (let row = 0; row < 9; row++) {
    const rowStart: number = row * SUDOKU_ROW_LENGTH;
    const rowEnd: number = (row + 1) * SUDOKU_ROW_LENGTH;
    const sudokuRow: number[] = sudokuString
      .slice(rowStart, rowEnd)
      .split("")
      .map(char => !isNaN ? parseInt(char) : 0);

    sudokuGrid.push(sudokuRow)
  }

  return sudokuGrid;
}

