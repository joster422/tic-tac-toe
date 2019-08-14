import { Cell } from "./cell/cell";
import { CellState } from "./cell/cell.enum";

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
    let rows: Cell[] = [];
    let columns: Cell[] = [];
    let diagonal1: Cell[] = [];
    let diagonal2: Cell[] = [];

    for (let i = 0; i < 3; i++) {
      diagonal1.push(this.grid.find(cell => cell.x === i && cell.y === i)!);
      diagonal2.push(this.grid.find(cell => cell.x === i && cell.y === 2 - i)!);
      for (let j = 0; j < 3; j++) {
        rows.push(this.grid.find(cell => cell.x === i && cell.y === j)!);
        columns.push(this.grid.find(cell => cell.x === j && cell.y === i)!);
      }
    }

    return [rows, columns, diagonal1, diagonal2];
  }

  get turnState(): CellState {
    return this.turn % 2 === 0 && this.isXFirst ? CellState.x : CellState.o;
  }

  claim(cell: Cell): boolean | null | undefined {
    if (cell.state !== null) return undefined;

    cell.state = this.turnState;
    this.turn++;

    if (this.grid.every(cell => cell.state !== null)) return null;

    return this.paths.some(
      path =>
        path.every(cell => cell.state === CellState.x) ||
        path.every(cell => cell.state === CellState.o)
    );
  }
}
