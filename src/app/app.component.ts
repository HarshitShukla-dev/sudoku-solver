import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SudokuSolverComponent } from './sudoku-solver/sudoku-solver.component';
import { setColorScheme } from 'mdui/functions/setColorScheme.js';


import 'mdui/mdui.css'
import 'mdui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, SudokuSolverComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'sudoku-solver';
  isDarkTheme = true;

  toggleTheme(){
    const htmlTag = document.documentElement;
    this.isDarkTheme = !this.isDarkTheme;
    if (htmlTag.classList.contains('mdui-theme-dark')) {
      htmlTag.classList.remove('mdui-theme-dark');
      htmlTag.classList.add('mdui-theme-light');
    } else {
      htmlTag.classList.remove('mdui-theme-light');
      htmlTag.classList.add('mdui-theme-dark');
    }
  }

promptForColor(): void {
  const color = window.prompt('Please enter a color value in hex format (e.g., #ff9ac9):');
  if (color) {
    setColorScheme(color); // Call the imported function with the user-provided color
  }
}
}
