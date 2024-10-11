import { Component, Renderer2, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  // Tracking function to uniquely identify rows
  trackByRow(index: number, row: any): number {
    return index;
  }

  // Tracking function to uniquely identify cells
  trackByCell(index: number, cell: any): number {
    return index;
  }

  // Prevent invalid input like non-numbers or out-of-range numbers
  preventInvalidInput(event: KeyboardEvent): void {
    const inputChar = event.key;
    if (!/^[1-9]$/.test(inputChar) && event.key !== 'Backspace' && event.key !== 'Delete') {
      event.preventDefault();
    }
  }

  fillRandom() {
    this.board = Array.from({ length: 9 }, () => Array(9).fill(null));
    let filledCells = 0;
    while (filledCells < 12) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      const num = Math.floor(Math.random() * 9) + 1;
      if (this.board[row][col] === null && this.isUnique(row, col, num)) {
        this.board[row][col] = num;
        filledCells++;
      }
    }
    this.resetCellColor();
  }

  resetCellColor() {
    const cells = this.el.nativeElement.querySelectorAll('.cell');
    cells.forEach((cell: any) => {
      this.renderer.setStyle(cell, 'border-color', 'rgb(var(--mdui-color-tertiary))');
      this.renderer.setStyle(cell, 'background-color', 'rgb(var(--mdui-color-surface-container-highest))');
    });
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
        this.changeCellColor();
      } else {
        console.error('Failed to solve Sudoku.');
        this.changeCellColor('red', 'rgba(var(--mdui-color-warning))');
      }
    }).catch(error => {
      console.error('Error solving Sudoku:', error);
    });
  }

  changeCellColor(color1: string = 'rgb(var(--mdui-color-success-border))', color2: string = 'rgba(var(--mdui-color-success))') {
    const cells = this.el.nativeElement.querySelectorAll('.cell');
    cells.forEach((cell: any) => {
      this.renderer.setStyle(cell, 'border-color', color1);
      this.renderer.setStyle(cell, 'background-color', color2);
    });
  }

  async solve(row: number, col: number): Promise<boolean> {
    if (row === 9) return true;
    if (col === 9) return this.solve(row + 1, 0);
    if (this.board[row][col] !== null) return this.solve(row, col + 1);

    for (let num = 1; num <= 9; num++) {
      if (this.isSafe(row, col, num)) {
        this.board[row][col] = num;
        await this.updateBoard();
        if (await this.solve(row, col + 1)) return true;
        this.board[row][col] = null;
        await this.updateBoard();
      }
    }
    return false;
  }

  updateBoard() {
    return new Promise(resolve => setTimeout(resolve, 1));
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

  // Updated solveInstantly function with error handling
  solveInstantly(row: number = 0, col: number = 0): void {
    try {
      const isSolved = this.solveInstantlyHelper(row, col);
      if (isSolved) {
        console.log('Sudoku solved instantly!');
        this.changeCellColor(); // Change to green
      } else {
        throw new Error('Failed to solve Sudoku instantly.');
      }
    } catch (error) {
      console.error(error);
      this.changeCellColor('red', 'rgba(var(--mdui-color-warning))'); // Change to red
    }
  }

  // Helper function for solveInstantly logic
  solveInstantlyHelper(row: number = 0, col: number = 0): boolean {
    if (row === 9) return true;
    if (col === 9) return this.solveInstantlyHelper(row + 1, 0);
    if (this.board[row][col] !== null) return this.solveInstantlyHelper(row, col + 1);

    for (let num = 1; num <= 9; num++) {
      if (this.isSafe(row, col, num)) {
        this.board[row][col] = num;
        if (this.solveInstantlyHelper(row, col + 1)) return true;
        this.board[row][col] = null;
      }
    }
    return false;
  }
}
