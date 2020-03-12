import { Cell } from './cell/cell';
import { Game } from './game';

export class Bot {

  constructor(private readonly canClaimCenterFirst = true) { }

  getClaim(game: Game): Cell {
    const safeCenterCell = game.moves.find(cell => cell.x === 1 && cell.y === 1);
    const safeCornerCells = game.moves.filter(cell => cell.x !== 1 && cell.y !== 1);

    if (game.moves.length === 9 && safeCenterCell !== undefined && safeCornerCells.length > 0)
      return this.canClaimCenterFirst
        ? safeCenterCell
        : safeCornerCells[Math.floor(Math.random() * safeCornerCells.length)];

    if (game.moves.length === 8 && safeCenterCell === undefined && safeCornerCells.length > 0)
      return safeCornerCells[Math.floor(Math.random() * safeCornerCells.length)];

    const urgentPaths = game.paths
      .filter(path => path.filter(cell => cell.state === undefined).length === 1)
      .filter(path => {
        const statePaths = path.filter(cell => cell.state !== undefined);
        return statePaths.every(cell => cell.state === statePaths[0].state);
      });

    const win = this.getUrgentCell(urgentPaths, game.turn);
    if (win !== undefined)
      return win;

    const notLose = this.getUrgentCell(urgentPaths, game.turn === 'x' ? 'o' : 'x');
    if (notLose !== undefined)
      return notLose;

    if (safeCenterCell !== undefined)
      return safeCenterCell;

    if (safeCornerCells.length > 0)
      return safeCornerCells[Math.floor(Math.random() * safeCornerCells.length)];

    if (game.moves.length > 0 && game.moves.length <= 2)
      return game.moves[Math.floor(Math.random() * game.moves.length)];

    throw new Error('incorrect grid layout');
  }

  private getUrgentCell(paths: Cell[][], turn: 'x' | 'o'): Cell | undefined {
    for (const path of paths)
      if (path.every(cell => cell.state === turn || cell.state === undefined)) {
        const temp = path.find(cell => cell.state === undefined);
        if (temp === undefined) throw new Error('urgentPaths has failed: each path should have 1 empty cell');
        return temp;
      }
    return undefined;
  }

  // todo
  private async score(game: Game, cell: Cell): Promise<number> {
    const newGame = new Game(game.grid);
    if (newGame.play(cell))
      return 1;

    let sum = 0;
    for (const move of newGame.moves)
      sum += await this.score(newGame, move);

    return sum;
  }
}
