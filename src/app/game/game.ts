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

  get paths(): Cell[][] {
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

  // call this on a cell who is not hidden
  // return true if choice results in win
  // return false if choice results in no more playable moves
  // return null if choice does not result in a win
  choose(cell: Cell): boolean | null {
    this.turn++;
    cell.state =
      this.turn % 2 === 1 && this.isXFirst ? CellState.x : CellState.o;
    if (this.grid.every(cell => cell.state !== null)) return false;
    return this.paths.some(
      path =>
        path.every(cell => cell.state === CellState.x) ||
        path.every(cell => cell.state === CellState.o)
    )
      ? true
      : null;
  }
}
