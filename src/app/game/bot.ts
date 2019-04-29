import { Cell } from "./cell";
import { Game } from "./game";

export class Bot {
  constructor(private isAllowedCenterFirst = true) {}

  getMove(game: Game): Cell {
    const blankCells = game.grid.filter(cell => cell.state === null);
    const centerCell = blankCells.find(cell => cell.x === 1 && cell.y === 1);
    const cornerCell = blankCells.find(cell => cell.x !== 1 && cell.y !== 1);

    if (blankCells.length === 9)
      return this.isAllowedCenterFirst ? centerCell! : cornerCell!;

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
    }

    const winPath = urgentPaths.find(path =>
      path.every(cell => cell.state === game.turnState || cell.state === null)
    );
    if (winPath) {
      return winPath.find(cell => cell.state === null)!;
    }

    // _ _ _
    // _ O X
    // X _ _
    const cornerCells = blankCells.filter(cell => cell.x !== 1 && cell.y !== 1);
    if (blankCells.length === 6 && cornerCells.length === 3) {
      const emptyPath = game.paths.find(path =>
        path.every(cell => cell.state === null)
      );
      return emptyPath!.find(cell => cell.x === 1 || cell.y === 1)!;
    }

    // X _ _
    // O X _
    // _ _ O
    console.log("guessing");
    return game.grid.find(cell => cell.state === null)!;
  }
}
