export const SUDOKU_ROW_LENGTH = 9;

export type CellValue = {
  value: number;
  isPuzzleValue: boolean;
};

// Returns an array of rows containing the sudoku digits
// Parses as integer to validate as number on client
export const parseSudoku = (sudokuString: string): CellValue[][] => {
  const sudokuGrid: CellValue[][] = [];

  for (let row = 0; row < SUDOKU_ROW_LENGTH; row++) {
    const rowStart: number = row * SUDOKU_ROW_LENGTH;
    const rowEnd: number = (row + 1) * SUDOKU_ROW_LENGTH;
    const sudokuRow: CellValue[] = sudokuString
      .slice(rowStart, rowEnd)
      .split("")
      .map(char => {
        const parsedValue = parseInt(char);
        if (isNaN(parsedValue)) {
          return { value: 0, isPuzzleValue: false };
        }

        return { value: parsedValue, isPuzzleValue: true };
      });

    sudokuGrid.push(sudokuRow)
  }

  return sudokuGrid;
}
