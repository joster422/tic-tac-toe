import { CellState } from "./cell.enum";

export class Cell {
  state: CellState | null = null;
  highlight = false;

  constructor(public readonly x: number, public readonly y: number) { }
}
