import { Cell } from "./cell";
import { Game } from "./game";

export class Bot {
  constructor(private isBotAllowedCenter: boolean) {}
  getMove(game: Game): Cell {
    const blankCells = game.grid.filter(cell => cell.state === null);
    const centerCell = game.grid.find(cell => cell.x === 1 && cell.y === 1);
    const cornerCell = game.grid.find(cell => cell.x !== 1 && cell.y !== 1);

    if (blankCells.length === 9)
      return this.isBotAllowedCenter ? centerCell : cornerCell;

    if (centerCell.state === null) return centerCell;

    if (blankCells.length === 8) return cornerCell;

    const dangerPaths = game.paths.filter(
      path => path.filter(cell => cell.state === null).length === 1
    );
    const urgentPath = dangerPaths.find(path => {
      const statePaths = path.filter(cell => cell.state !== null);

      return statePaths.every(cell => cell.state === statePaths[0].state);
    });

    if (urgentPath) return urgentPath.find(cell => cell.state === null);

    debugger;
  }
}
