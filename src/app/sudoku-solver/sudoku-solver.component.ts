import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import 'mdui/mdui.css'
import 'mdui';

@Component({
  selector: 'app-sudoku-solver',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sudoku-solver.component.html',
  styleUrl: './sudoku-solver.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SudokuSolverComponent {
board: (number | null)[][] = Array.from({ length: 9 }, () => Array(9).fill(null));

fillRandom() {
  this.board = Array.from({ length: 9 }, () => Array(9).fill(null));
  let filledCells = 0;
  while (filledCells < 20) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    const num = Math.floor(Math.random() * 9) + 1;
    if (this.board[row][col] === null && this.isUnique(row, col, num)) {
      this.board[row][col] = num;
      filledCells++;
    }
  }
}

isUnique(row: number, col: number, num: number): boolean {
  for (let i = 0; i < 9; i++) {
    if (this.board[row][i] === num || this.board[i][col] === num) {
      return false;
    }
  }
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (this.board[startRow + i][startCol + j] === num) {
        return false;
      }
    }
  }
  return true;
}

  solveSudoku() {
    this.solve(0, 0).then(solved => {
      if (solved) {
        console.log('Sudoku solved successfully!');
        // Manually trigger change detection to update the UI
      } else {
        console.error('Failed to solve Sudoku.');
      }
    }).catch(error => {
      console.error('Error solving Sudoku:', error);
    });
  }

async solve(row: number, col: number): Promise<boolean> {
    if (row === 9) return true;
    if (col === 9) return this.solve(row + 1, 0);
    if (this.board[row][col] !== null) return this.solve(row, col + 1);

    for (let num = 1; num <= 9; num++) {
      if (this.isSafe(row, col, num)) {
        this.board[row][col] = num;
        await this.updateBoard(); // Ensure visualization updates are awaited
        if (await this.solve(row, col + 1)) return true;
        this.board[row][col] = null;
        await this.updateBoard(); // Ensure visualization updates are awaited for backtracking
      }
    }
    return false;
  }

  // Assuming updateBoard is already correctly implemented to update the UI

  updateBoard() {
    return new Promise(resolve => setTimeout(resolve, 0));
  }


  isSafe(row: number, col: number, num: number): boolean {
    for (let x = 0; x < 9; x++) {
      if (this.board[row][x] === num || this.board[x][col] === num ||
        this.board[Math.floor(row / 3) * 3 + Math.floor(x / 3)]
        [Math.floor(col / 3) * 3 + x % 3] === num) {
        return false;
      }
    }
    return true;
  }

  solveInstantly(row: number = 0, col: number = 0): boolean {
  if (row === 9) return true; // If we've reached the end of the board, the sudoku is solved
  if (col === 9) return this.solveInstantly(row + 1, 0); // Move to the next row if we've reached the end of a column
  if (this.board[row][col] !== null) return this.solveInstantly(row, col + 1); // Skip filled cells

  for (let num = 1; num <= 9; num++) {
    if (this.isSafe(row, col, num)) {
      this.board[row][col] = num; // Try this number for the current cell
      if (this.solveInstantly(row, col + 1)) return true; // If it leads to a solution, return true
      this.board[row][col] = null; // Otherwise, backtrack
    }
  }
  return false; // If no number can be placed in this cell, return false
}

}