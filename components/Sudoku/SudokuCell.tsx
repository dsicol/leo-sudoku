import { useSudoku } from "@/app/contexts/SudokuContext";
import { CellValue, SUDOKU_ROW_LENGTH } from "@/utils/helpers/parseSudoku";
import { useMemo } from "react";

type SudokuCellProps = {
  cellValue: CellValue;
  rowIndex: number;
  colIndex: number;
}

const getBorderClasses = (rowIndex: number, colIndex: number) => {
  const isTop = rowIndex % 3 === 0 && rowIndex !== 0;
  const isLeft = colIndex % 3 === 0 && colIndex !== 0;
  const isBottom = (rowIndex + 1) % 3 === 0 && rowIndex !== SUDOKU_ROW_LENGTH - 1;
  const isRight = (colIndex + 1) % 3 === 0 && colIndex !== SUDOKU_ROW_LENGTH - 1;

  return [
    isTop ? "border-t-2" : "",
    isLeft ? "border-l-2" : "",
    isBottom ? "border-b-2" : "",
    isRight ? "border-r-2" : ""
  ].join(" ");
};


const SudokuCell = ({ cellValue, rowIndex, colIndex, }: SudokuCellProps) => {
  const { board, setBoard, validation } = useSudoku();
  
  const baseClass = "bg-white flex items-center justify-center border border-black";
  const borderClasses = getBorderClasses(rowIndex, colIndex);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, colIndex: number) => {
    const value = e.target.value;
    
    if (/^[1-9]$/.test(value) || value === '') {
      const newValue = value === '' ? 0 : parseInt(value, 10);
      const newBoard = [...board];
      newBoard[rowIndex][colIndex] = { value: newValue, isPuzzleValue: false };
      setBoard(newBoard);
    }
  };

  const isInvalidInput = useMemo(() => 
    cellValue.value === 0, 
  [cellValue.value]);

  return (
    <div
      className={`${baseClass} ${borderClasses}`}
    >
      {cellValue.isPuzzleValue ? (
        <span className="text-2xl text-black">{cellValue.value}</span>
      ) : (
        <input
          className={`w-full h-full text-center text-2xl ${validation ? "text-blue" : "text-red"}`}
          value={isInvalidInput ? '' : cellValue.value}
          onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
          pattern="[1-9]"
        />
      )}
    </div>
  );
};


export default SudokuCell;
