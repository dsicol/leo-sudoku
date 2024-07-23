import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export type Puzzle = {
  id: string;
  puzzle: string;
}

const getSudokuGames = async (): Promise<Puzzle[]> => {
  const supabase = createClient();
  const { data: sudokuPuzzles } = await supabase.from("sudoku_puzzles").select("id, puzzle");

  return sudokuPuzzles || [];
}

const SudokuList = async () => {
  const sudokuList = await getSudokuGames();
  
  return (
    <>
      <div>Hello</div>
      {sudokuList?.map(sudoku => (
        <Link key={sudoku.id} href={`/sudoku/${sudoku.id}`}>
          {sudoku.puzzle}
        </Link>
      ))}
    </>
  );
}

export default SudokuList;
