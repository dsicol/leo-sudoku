# Leo-Sudoku

## Abstract
This is a simple sudoku playing web application hosted with Next.js and Supabase.

## Structure
- Home Page
    - Entry point
- Sudoku Puzzle List Page
    - Lists out all sudoku games present at the current moment
- Sudoku Puzzle Game Page
    - The sudoku game grid for gameplay

## Vercel hosting
This application is hosted on Vercel. The URLs are referenced below:
- [Home Page](https://leo-sudoku.vercel.app/)
- [Sudoku Puzzle List Page](https://leo-sudoku.vercel.app/sudoku)
- Sudoku Puzzle Game Page
    - Dynamically rendered URL from the puzzles list page

## Gameplay
### Solving the grid
- Sudoku is a logic-based number placement puzzle played on a 9×9 grid. The goal is to fill the grid with digits so that each column, row, and 3×3 sub-grid contains all the digits from 1 to 9 without any repetition. The puzzle starts with some digits already filled in, and the solver must use logic and deduction to determine the remaining digits.
- Default puzzle values already filled in are black in colour.
- When a number entry is invalid, all entries will turn red to highlight to the user that the board is in an invalidate state, and hence not solvable.
- Valid entries thus far in the board will show as dark blue.
### Controls
- Clicking on the `submit` button before completing the puzzle will prompt the user to continue the puzzle
- If the user would like to visit another puzzle without completing the current one, they may click on the `back` button on the navigation bar
- If the user would like to reset the grid, the `reset` button below allows the user to re-render the original puzzle.

### Submitting the grid
- When the state of the board is valid and all cells has been filled, it implies that the board has been solved
- As such, the `submit` button will turn blue and the user will be able to complete the puzzle!
- The modal will then prompt the user back to the puzzle list to try out other puzzles.
