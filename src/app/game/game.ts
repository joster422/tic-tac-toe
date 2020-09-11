import { Cell } from './cell/cell';

export class Game {
  turn: 'x' | 'o' = 'x';

  constructor(public grid: Cell[]) {
    if (grid.filter(cell => cell.state === 'x').length > grid.filter(cell => cell.state === 'o').length)
      this.turn = 'o';
  }

  get paths(): Cell[][] {
    let paths: Cell[][] = [];
    let diagonal1: Cell[] = [];
    let diagonal2: Cell[] = [];

    for (let i = 0; i < 3; i++) {
      let rows: Cell[] = [];
      let columns: Cell[] = [];

      diagonal1 = [...diagonal1, ...this.grid.filter(cell => cell.x === i && cell.y === i)];
      diagonal2 = [...diagonal2, ...this.grid.filter(cell => cell.x === i && cell.y === 2 - i)];

      for (let j = 0; j < 3; j++) {
        rows = [...rows, ...this.grid.filter(cell => cell.x === i && cell.y === j)];
        columns = [...columns, ...this.grid.filter(cell => cell.x === j && cell.y === i)];
      }

      paths = [...paths, rows, columns];
    }

    return [...paths, diagonal1, diagonal2];
  }

  get moves(): Cell[] {
    return this.grid.filter(cell => cell.state === undefined);
  }

  get winPath() {
    return this.paths
      .find(path => path.every(cell => cell.state === 'x') || path.every(cell => cell.state === 'o'));
  }

  get areNoMovesRemaining() {
    return this.grid.every(cell => cell.state !== undefined);
  }

  win(x: number, y: number): boolean {
    const cell = this.grid.find(c => c.x === x && c.y === y);
    if (cell === undefined || cell.state !== undefined)
      throw new Error('cannot play non-empty cell');
    cell.state = this.turn;
    if (this.winPath !== undefined)
      return true;
    this.turn = this.turn === 'x' ? 'o' : 'x';
    return false;
  }


}
