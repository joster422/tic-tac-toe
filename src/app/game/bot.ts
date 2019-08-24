import { Cell } from './cell/cell';
import { Game } from './game';

export class Bot {

  constructor(private readonly canClaimCenterFirst = true) { }

  getClaim(game: Game): Cell {
    const blankCells = game.grid.filter(cell => cell.state === undefined);
    const safeCenterCell = blankCells.find(cell => cell.x === 1 && cell.y === 1);
    const safeCornerCells = blankCells.filter(cell => cell.x !== 1 && cell.y !== 1);

    if (blankCells.length === 9) return this.canClaimCenterFirst ? safeCenterCell! : safeCornerCells[0]!;

    if (safeCenterCell) return safeCenterCell;

    const urgentPaths = game.paths
      .filter(path => path.filter(cell => cell.state === undefined).length === 1)
      .filter(path => {
        const statePaths = path.filter(cell => cell.state !== undefined);
        return statePaths.every(cell => cell.state === statePaths[0].state);
      });

    const winPath = urgentPaths.find(path => path.every(cell => cell.state === game.turn || cell.state === undefined));
    if (winPath) return winPath.find(cell => cell.state === undefined)!;

    const opponent = game.turn === 'x' ? 'o' : 'x';
    const notLosePath = urgentPaths.find(path => path.every(cell => cell.state === opponent || cell.state === undefined));
    if (notLosePath) return notLosePath.find(cell => cell.state === undefined)!;

    if (blankCells.length === 6 && safeCornerCells.length !== 4)
      return blankCells!.find(cell => cell.x === 1 || cell.y === 1)!;

    if (safeCornerCells.length > 0) return safeCornerCells[0];

    return game.grid.find(cell => cell.state === undefined)!;
  }
}
