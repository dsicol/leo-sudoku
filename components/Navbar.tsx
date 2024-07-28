'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image'

const NavBar = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  const handleClick = () => {
    router.push('/');
  }

  return (
    <nav className="w-full flex justify-between items-center bg-gray-800 p-4">
      <div className="flex items-center">
        <Image src="/logos/leo-sudoku-logo.png" alt="Logo" width={32} height={32} className="h-8 w-8 mr-2" />
        <button onClick={handleClick} className="text-white text-xl">Leo-Sudoku</button>
      </div>
      <button onClick={handleBack} className="text-white">
        Back
      </button>
    </nav>
  );
};

export default NavBar;
