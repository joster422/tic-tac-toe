import { Cell } from './cell';
import { Game } from './game';
import { CellState } from './cell-state.enum';

export class Bot {
  constructor(private isAllowedCenterFirst = true) {}

  getMove(game: Game): Cell {
    const blankCells = game.grid.filter(cell => cell.state === null);
    const centerCell = blankCells.find(cell => cell.x === 1 && cell.y === 1);
    const cornerCell = blankCells.find(cell => cell.x !== 1 && cell.y !== 1);

    if (blankCells.length === 9)
      return this.isAllowedCenterFirst ? centerCell! : cornerCell!;

    if (centerCell) return centerCell;

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

    // _ _ _ | _ _ X
    // _ O X | _ O _
    // X _ _ | X _ _
    if (
      blankCells.length === 6 &&
      game.grid.find(cell => cell.x === 1 && cell.y === 1)!.state ===
        CellState.o
    ) {
      return blankCells!.find(cell => cell.x === 1 || cell.y === 1)!;
    }

    // O _ _ | X _ _
    // _ X _ | O X _
    // _ _ X | _ _ O
    const safeCorners = blankCells.filter(cell => cell.x !== 1 && cell.y !== 1);
    if (safeCorners.length > 0) {
      return safeCorners[0];
    }

    console.log('guessing');
    return game.grid.find(cell => cell.state === null)!;
  }
}
