import { Modal } from "antd";
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useCallback } from "react";

type SudokuModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isSolved: boolean;
}

const SOLVED_TEXT: string = "Congratulations on completing the puzzle!\nYou may redirect to the home page to explore more puzzles";
const UNSOLVED_TEXT: string = "Oops, you have not completed the puzzle.\nKeep trying!\nAlternatively, you may press back and explore other puzzles too";

const SudokuModal = ({ open, setOpen, isSolved }: SudokuModalProps) => {
  const router = useRouter();

  const handleSolveOk = useCallback((): void => {
    if (!isSolved) {
      setOpen(false);
    }
    router.push('/sudoku');
  }, [setOpen, isSolved]);
  
  const handleCancel = useCallback((): void => {
    setOpen(false)
  }, [setOpen]);
  
  return (
      <Modal
        onCancel={handleCancel}
        onOk={handleSolveOk}
        okText={isSolved ? "To puzzles" : "Continue"}
        open={open}
        title={isSolved ? "Congratulations!" : "Puzzle Incomplete"}
        
      >
        {isSolved ? <p>{SOLVED_TEXT}</p> : <p>{UNSOLVED_TEXT}</p>}
      </Modal>
  )
};

export default SudokuModal;
