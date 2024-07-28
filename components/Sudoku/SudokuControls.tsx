import { Button, Flex } from "antd";
import { CheckOutlined, UndoOutlined } from '@ant-design/icons';
import validateSudoku, { isEmptyBoard } from "@/utils/helpers/validateSudoku";
import { useSudoku } from "@/app/contexts/SudokuContext";
import { useCallback, useMemo, useState } from "react";
import { parseSudoku, SUDOKU_ROW_LENGTH } from "@/utils/helpers/parseSudoku";
import { isEmpty, isNil } from "lodash";
import SudokuModal from "./SudokuModal";

enum ButtonType {
  Solved = "primary",
  Unsolved = "default"
}

const SudokuControls = ({ sudokuGameString }: { sudokuGameString: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { board, setBoard } = useSudoku();

  const hasEmptyCells = useMemo(() => {
    if (isEmptyBoard(board)) {
      return true;
    }

    for (let row = 0; row < SUDOKU_ROW_LENGTH; row++) {
      for (let col = 0; col < SUDOKU_ROW_LENGTH; col++) {
        console.log(isEmpty(board[row][col].value))
        if (isNil(board[row][col].value) || board[row][col].value === 0) {
          return true;
        }
      }
    }

    return false;
  }, [board]);

  const isSolved = useMemo(() => validateSudoku(board) && !hasEmptyCells, [board, hasEmptyCells]);

  const onSubmit = useCallback(() => {
    setOpen(true)
  }, [isSolved]);

  const onReset = useCallback(() => {
    const sudokuBoard = parseSudoku(sudokuGameString);
    setBoard(sudokuBoard);
  }, [sudokuGameString, setBoard]);

  const handleButtonType = useMemo(() => isSolved ? ButtonType.Solved : ButtonType.Unsolved, [isSolved]);

  return (
    <>
      <Flex gap="small">
        <Button icon={isSolved ? <CheckOutlined /> : null} onClick={onSubmit} type={handleButtonType}>
            Submit
        </Button>
        <Button icon={<UndoOutlined />} onClick={onReset}>
            Reset
        </Button>
      </Flex>
      <SudokuModal open={open} setOpen={setOpen} isSolved={isSolved} />
    </>
  );
};

export default SudokuControls;
