import { CellState } from "./cell-state.enum";

export class Cell {
  state: CellState = null;
  constructor(public readonly x: number, public readonly y: number) {}
}
