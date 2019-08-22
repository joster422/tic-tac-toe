import { Cell } from "./cell/cell";

export class Game {
  grid: Cell[] = [];
  turn: 'x' | 'o' = 'x';

  constructor(public readonly isXFirst = true) {
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        this.grid.push(new Cell(x, y));
      }
    }
  }

  get paths(): Cell[][] {
    let paths: Cell[][] = [];
    let diagonal1: Cell[] = [];
    let diagonal2: Cell[] = [];

    for (let i = 0; i < 3; i++) {
      let rows: Cell[] = [];
      let columns: Cell[] = [];

      diagonal1.push(this.grid.find(cell => cell.x === i && cell.y === i)!);
      diagonal2.push(this.grid.find(cell => cell.x === i && cell.y === 2 - i)!);

      for (let j = 0; j < 3; j++) {
        rows.push(this.grid.find(cell => cell.x === i && cell.y === j)!);
        columns.push(this.grid.find(cell => cell.x === j && cell.y === i)!);
      }

      paths = [...paths, rows, columns];
    }

    return [...paths, diagonal1, diagonal2];
  }

  didWin(cell: Cell) {
    if (cell.state !== undefined) return undefined;
    cell.state = this.turn;
    if (this.winPath) return cell.state;
    if (this.grid.every(cell => cell.state !== undefined)) return null;
    this.turn = this.turn === 'x' ? 'o' : 'x';
    return false;
  }

  get winPath() {
    return this.paths.find(
      path => path.every(cell => cell.state === 'x') || path.every(cell => cell.state === 'o')
    )
  }
}
