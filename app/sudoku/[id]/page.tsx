import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/server';
import { Puzzle } from '../page';

const getSudokuGame = async (sudokuId: string): Promise<Puzzle | null> => {
  const supabase = createClient();
  const { data: sudokuGame, error } = await supabase
    .from("sudoku_puzzles")
    .select("id, puzzle")
    .eq("id", sudokuId)
    .single();
  console.log(sudokuGame);
  
  if (error) {
    console.error("Error fetching sudoku game: ", error)
    return null;
  }

  return sudokuGame;
}

const SudokuGame = async () => {
  const router = useRouter();
  const { sudokuId } = router.query;
  const [sudokuGame, setSudokuGame] = useState<Puzzle | null>(null);

  useEffect(() => {
    const fetchSudokuGame = async () => {
      if (typeof sudokuId === 'string') {
        const game = await getSudokuGame(sudokuId);
        setSudokuGame(game);
      }
    };

    fetchSudokuGame();
  }, [sudokuId]);
  
  if (!sudokuGame) {
    return <div>Sudoku game not found</div>;
  }

  const sudokuGrid = parseSudoku(sudokuGame.puzzle);

  return (
    <>
      <div>Sudoku Game ID: {sudokuGame.id}</div>
      <div>
        {sudokuGrid.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} style={{ width: '20px', height: '20px', border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {cell === 0 ? '' : cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default SudokuGame;
