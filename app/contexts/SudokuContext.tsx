import { CellValue } from '@/utils/helpers/parseSudoku';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

export type SudokuContextValue = {
  board: CellValue[][];
  setBoard: Dispatch<SetStateAction<CellValue[][]>>;
  validation: boolean;
  setValidation: Dispatch<SetStateAction<boolean>>;
}

const SudokuContext = createContext<SudokuContextValue | undefined>(undefined);

export const useSudoku = (): SudokuContextValue => {
  const context = useContext(SudokuContext);
  
  if (context === undefined) {
    throw new Error('useSudoku must be used within a SudokuProvider');
  }

  return context;
};

export const SudokuProvider = ({ children } : { children: ReactNode }) => {
  const [board, setBoard] = useState<CellValue[][]>([[]]);
  const [validation, setValidation] = useState<boolean>(true);

  return (
    <SudokuContext.Provider value={{ board, setBoard, validation, setValidation }}>
      {children}
    </SudokuContext.Provider>
  );
};
