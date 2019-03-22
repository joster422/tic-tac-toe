import { Cell } from "./cell";
import { Game } from "./game";

export class Bot {
  constructor(private isAllowedCenter: boolean) {}

  getMove(game: Game): Cell {
    const blankCells = game.grid.filter(cell => cell.state === null);
    const centerCell = blankCells.find(cell => cell.x === 1 && cell.y === 1);
    const cornerCell = blankCells.find(cell => cell.x !== 1 && cell.y !== 1);

    if (blankCells.length === 9)
      return this.isAllowedCenter ? centerCell! : cornerCell!;

    if (centerCell && centerCell.state === null) return centerCell;

    if (blankCells.length === 8) return cornerCell!;

    const dangerPaths = game.paths.filter(
      path => path.filter(cell => cell.state === null).length === 1
    );
    const urgentPaths = dangerPaths.filter(path => {
      const statePaths = path.filter(cell => cell.state !== null);
      return statePaths.every(cell => cell.state === statePaths[0].state);
    });

    if (urgentPaths.length === 1) {
      return urgentPaths[0].find(cell => cell.state === null)!;
    } else if (urgentPaths.length > 1) {
      // get bot player context
    }

    debugger;
    return game.grid[0];
  }
}
