export class Cell {
  state?: 'x' | 'o';

  constructor(
    public readonly x: number,
    public readonly y: number
  ) { }
}
