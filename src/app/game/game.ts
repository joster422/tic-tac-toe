import { Cell } from "./cell";
import { CellState } from "./cell-state.enum";

export class Game {
  grid: Cell[] = [];
  turn = 0;

  constructor(public readonly isXFirst = true) {
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        this.grid.push(new Cell(x, y));
      }
    }
  }

  choose(x: number, y: number): boolean {
    let cell = this.grid.find(cell => cell.x === x && cell.y === y);
    if (cell.state !== null) return false;
    this.turn++;
    cell.state =
      this.turn % 2 === 1 && this.isXFirst ? CellState.x : CellState.o;
    return this.isOver();
  }

  private isOver(): boolean {
    const paths = this.getAllPaths();
    return (
      paths.some(
        path =>
          path.every(cell => cell.state === CellState.x) ||
          path.every(cell => cell.state === CellState.o)
      ) || this.grid.every(cell => cell.state !== null)
    );
  }

  private getAllPaths(): Cell[][] {
    let paths = [];
    for (let i = 0; i < 3; i++) {
      let rows = [];
      let columns = [];
      for (let j = 0; j < 3; j++) {
        rows.push(this.grid.find(cell => cell.x === i && cell.y === j));
        columns.push(this.grid.find(cell => cell.x === j && cell.y === i));
      }
      paths = [...paths, rows, columns];
    }
    let diagonal1 = [];
    let diagonal2 = [];
    for (let i = 0; i < 3; i++) {
      diagonal1.push(this.grid.find(cell => cell.x === i && cell.y === i));
      diagonal2.push(this.grid.find(cell => cell.x === i && cell.y === 2 - i));
    }
    paths = [...paths, diagonal1, diagonal2];
    return paths;
  }
}
