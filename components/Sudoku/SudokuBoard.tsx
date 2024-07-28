import { useSudoku } from '@/app/contexts/SudokuContext';
import { parseSudoku } from '@/utils/helpers/parseSudoku';
import validateSudoku from '@/utils/helpers/validateSudoku';
import { useEffect, useMemo } from 'react';
import SudokuCell from './SudokuCell';

const SudokuBoard = ({ sudokuGameString }: { sudokuGameString: string }) => {
  const { board, setBoard, setValidation } = useSudoku();

  const sudokuBoard = useMemo(() => parseSudoku(sudokuGameString), [sudokuGameString]);

  useEffect(() => {
    setBoard(sudokuBoard);
  }, [sudokuBoard]);

  useEffect(() => {
    setValidation(validateSudoku(board));
  }, [board]);

  return (
    <div className="flex justify-center items-center py-20">
      <div className="grid grid-cols-9 grid-rows-9 w-160 h-160">
        {board.map((row, rowIndex) => (
          row.map((cellValue, colIndex) => (
            <SudokuCell cellValue={cellValue} rowIndex={rowIndex} colIndex={colIndex}/>
          ))
        ))}
      </div>
    </div>
  );
};


export default SudokuBoard;
