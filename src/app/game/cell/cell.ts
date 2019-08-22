export class Cell {
  state?: 'x' | 'o';
  highlight = false;

  constructor(public readonly x: number, public readonly y: number) { }
}