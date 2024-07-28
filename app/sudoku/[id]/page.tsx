'use client';
import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';
import { Puzzle } from '../page';
import { useParams } from 'next/navigation';
import SudokuBoard from '@/components/Sudoku/SudokuBoard';
import { SudokuProvider } from '@/app/contexts/SudokuContext';
import SudokuControls from '@/components/Sudoku/SudokuControls';

const SUDOKU_GAME_ERROR_MESSAGE: string = "Error downloading puzzle:";

const fetchSudokuGame = async (sudokuId: string): Promise<Puzzle | null> => {
  const supabase = createClient();
  const { data: sudokuGame, error } = await supabase
    .from("sudoku_puzzles")
    .select("id, puzzle")
    .eq("id", sudokuId)
    .single();
  
  if (error) {
    console.error(`${SUDOKU_GAME_ERROR_MESSAGE} ${error}`);
    return null;
  }

  return sudokuGame;
}

const SudokuGame = () => {
  const params = useParams();
  const { id: sudokuId } = params;
  const [sudokuGameString, setSudokuGameString] = useState<string>('');

  useEffect(() => {
    if (sudokuId) {
      fetchSudokuGame(sudokuId as string)
        .then(res => {
          if (!res) {
            setSudokuGameString('');
          } else {
            setSudokuGameString(res.puzzle);
          }
        })
        .catch(error => {
          console.error(`${SUDOKU_GAME_ERROR_MESSAGE} ${error}`);
          setSudokuGameString('');
        });
    }
  }, [sudokuId]);

  return (
    <SudokuProvider>
      <>
        <SudokuBoard sudokuGameString={sudokuGameString} />
        <SudokuControls sudokuGameString={sudokuGameString} />
      </>
    </SudokuProvider>
  );
};

export default SudokuGame;
