import { Cell } from './cell/cell';
import { Game } from './game';

export class Bot {

  constructor(private readonly canClaimCenterFirst = true) { }

  async getClaim(game: Game): Promise<Cell> {
    const centerMove = game.moves.find(cell => cell.x === 1 && cell.y === 1);
    const cornerMoves = game.moves.filter(cell => cell.x !== 1 && cell.y !== 1);
    const turn0 = game.moves.length === 9;
    const turn1 = game.moves.length === 8;

    if (turn0 && centerMove !== undefined)
      return this.canClaimCenterFirst
        ? centerMove
        : cornerMoves[Math.floor(Math.random() * cornerMoves.length)];

    if (turn1)
      return centerMove !== undefined
        ? centerMove
        : cornerMoves[Math.floor(Math.random() * cornerMoves.length)];

    const scores = await this.scores(game, game.turn);

    let maxScoreIndex = 0;
    for (let i = 1; i < scores.length; i++)
      maxScoreIndex = scores[maxScoreIndex] > scores[i] ? maxScoreIndex : i;

    const maxScoreIndexs = scores
      .map((score, index) => score === scores[maxScoreIndex] ? index : -1)
      .filter(score => score !== -1);

    return game.moves[maxScoreIndexs[Math.floor(Math.random() * maxScoreIndexs.length)]];
  }

  private async scores(game: Game, turn: 'x' | 'o', depth = 0): Promise<number[]> {
    return Promise.all(game.moves.map(async move => {
      const gridCopy = JSON.parse(JSON.stringify(game.grid));
      const gameCopy = new Game(gridCopy);

      if (gameCopy.win(move.x, move.y))
        return gameCopy.turn === turn
          ? (100 - depth)
          : (-100 + depth);

      if (gameCopy.areNoMovesRemaining)
        return 0;

      const newScores = await this.scores(gameCopy, turn, depth + 1);

      return gameCopy.turn === turn
        ? Math.max(...newScores)
        : Math.min(...newScores);
    }));
  }
}
