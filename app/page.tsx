import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 py-10">
      <div className="text-center">
        <h1 className="text-4xl text-blue font-bold mb-8">Welcome to Leo-Sudoku</h1>
        <Link href="/sudoku">
          <div className="inline-block bg-blue-500 text-black font-semibold py-3 px-6 rounded-lg shadow-lg transition-colors hover:bg-blue-600">
            View Sudoku Puzzles
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;