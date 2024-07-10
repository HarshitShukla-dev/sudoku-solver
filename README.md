# Sudoku Solver

This is a Sudoku Solver built using Angular with standalone components and utilizes backtracking algorithm. The application allows you to:
- Randomly fill some cells in the Sudoku board.
- Manually solve the Sudoku.
- Solve the Sudoku using a backtracking algorithm with visualization.

## Hosted Application

You can access the hosted application [here](https://sudoku.hs.vc).

## Features

- **Randomly Fill**: Fill the Sudoku board with random numbers in valid positions.
- **Solve**: Automatically solve the Sudoku using backtracking with visualization.
- **Manual Solve**: Manually solve the Sudoku by entering numbers in the cells.

## Installation

To run the project locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/sudoku-solver.git
    cd sudoku-solver
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Run the application:
    ```sh
    ng serve
    ```

4. Open your browser and navigate to `http://localhost:4200`.

## Usage

- **Randomly Fill**: Click the "Randomly Fill" button to fill some cells with random numbers.
- **Solve**: Click the "Solve" button to start the backtracking algorithm. The process will be visualized in the grid.
- **Manual Solve**: After clicking "Randomly Fill," you can enter numbers manually in the cells to solve the Sudoku.

## Code Overview

### Components

- **SudokuSolverComponent**: This is the main component responsible for rendering the Sudoku grid, handling user interactions, and solving the Sudoku.

### Methods

- `fillRandom()`: Randomly fills some cells in the Sudoku board with valid numbers.
- `solveSudoku()`: Initiates the backtracking algorithm to solve the Sudoku.
- `solve(row: number, col: number)`: The recursive function implementing the backtracking algorithm.
- `isSafe(row: number, col: number, num: number)`: Checks if placing a number in a specific cell is valid.
- `updateBoard()`: Adds a delay to visualize the backtracking process.

### Styles

- The project uses MDUI components..

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Contact

If you have any questions or feedback, feel free to reach out.

