import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export type Puzzle = {
  id: string;
  puzzle: string;
}

const SUDOKU_LIST_ERROR_MESSAGE: string = "Error downloading puzzles";

const getSudokuGames = async (): Promise<Puzzle[]> => {
  const supabase = createClient();
  const { data: sudokuPuzzles, error } = await supabase.from("sudoku_puzzles").select("id, puzzle");

  if (error) {
    console.error(SUDOKU_LIST_ERROR_MESSAGE);

    return [];
  }

  return sudokuPuzzles ?? [];
}

const SudokuList = async () => {
  const sudokuList: Puzzle[] = await getSudokuGames();
  
  return (
    <div className="w-full min-h-screen bg-gray-100 py-10">
      <div className="w-full px-4">
        <h1 className="text-3xl text-blue text-center font-bold mb-8">Sudoku Puzzles</h1>
        <div className="pl-32 pr-32 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sudokuList?.map((sudoku, i) => (
            <Link key={sudoku.id} href={`/sudoku/${sudoku.id}`}>
              <div className="block bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
                <div className="text-lg text-center font-semibold mb-2">Puzzle {i + 1}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SudokuList;
