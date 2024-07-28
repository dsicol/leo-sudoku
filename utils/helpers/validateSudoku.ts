import { CellValue, SUDOKU_ROW_LENGTH } from "./parseSudoku";
import { isEmpty, isNil } from 'lodash';

export type SudokuMap = {
  [key: number]: Set<number>;
};

const validateRow = (rowMap: SudokuMap, row: number, value: number): boolean => {
  if (value === null || value === 0) return true;

  const existsInRow = rowMap[row] !== undefined && rowMap[row].has(value);
  if (existsInRow) {
    return false;
  }

  if (rowMap[row] === undefined) {
    rowMap[row] = new Set([value]);
  } else {
    rowMap[row].add(value);
  }

  return true;
}

const validateColumn = (colMap: SudokuMap, col: number, value: number): boolean => {
  if (value === null || value === 0) return true;

  const existsInColumn = colMap[col] !== undefined && colMap[col].has(value);
  if (existsInColumn) {
    return false;
  }

  if (colMap[col] === undefined) {
    colMap[col] = new Set([value]);
  } else {
    colMap[col].add(value);
  }

  return true;
}

const validateGrid = (gridMap: SudokuMap, row: number, col: number, value: number): boolean => {
  if (value === null || value === 0) return true;

  const gridIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);
  const existsInGrid = gridMap[gridIndex] !== undefined && gridMap[gridIndex].has(value);
  if (existsInGrid) {
    return false;
  }

  if (gridMap[gridIndex] === undefined) {
    gridMap[gridIndex] = new Set([value]);
  } else {
    gridMap[gridIndex].add(value);
  }

  return true;
}

export const isEmptyBoard = (board: CellValue[][]): boolean => {
  for (let row = 0; row < SUDOKU_ROW_LENGTH; row++) {
    if (!isEmpty(board[row])) {
      return false;
    }
  }
  return true;
}

const validateSudoku = (board: CellValue[][]): boolean => {
  if (isNil(board) || isEmptyBoard(board)) {
    return true;
  }

  const rowMap: SudokuMap = {};
  const colMap: SudokuMap = {};
  const gridMap: SudokuMap = {};

  for (let row = 0; row < SUDOKU_ROW_LENGTH; row++) {
    for (let col = 0; col < SUDOKU_ROW_LENGTH; col++) {
      const value = board[row][col].value;
      if (
        !validateRow(rowMap, row, value) ||
        !validateColumn(colMap, col, value) ||
        !validateGrid(gridMap, row, col, value)
      ) {
        return false;
      }
    }
  }

  return true;
}

export default validateSudoku;
