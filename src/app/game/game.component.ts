import { Component } from '@angular/core';
import { Bot } from './bot';
import { Cell } from './cell/cell';
import { Game } from './game';

import { CellState } from './cell/cell.enum';
import { Form } from './form/form.model';

@Component({
  selector: 'ttt-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  allowClicks = true;
  bot = new Bot();
  cellState = CellState;
  game = new Game();
  form = new Form();

  constructor() { }

  claim(cell: Cell) {
    if (!this.allowClicks) return;
    switch (this.game.claim(cell)) {
      case false:
        this.form.isBotEnabled && this.botMove();
        return;
      case true:
        this.game.turnState === CellState.o
          ? this.endGame(`X Wins`)
          : this.endGame(`O Wins`);
        break;
      case null:
        // draw
        this.newGame();
        break;
    }
  }

  newGame() {
    this.game = new Game();
    if (!this.form.isBotEnabled) return;
    this.bot = new Bot(this.form.isBotCenterFirst);
    if (!this.form.isBotFirst) return;
    this.botMove();
  }

  private botMove() {
    const didBotWin = this.game.claim(this.bot.getMove(this.game));
    if (didBotWin === undefined) throw new Error('bot should never play a claimed cell');
    if (didBotWin === false) return;
    if (didBotWin === null) {
      // draw
      this.newGame();
      return;
    }
    this.game.turnState === CellState.o
      ? this.endGame(`Bot X Wins`)
      : this.endGame(`Bot O Wins`);
  }

  private endGame(message: string) {
    this.allowClicks = false;
    const winPath = this.game.paths.find(
      path =>
        path.every(cell => cell.state === CellState.x) ||
        path.every(cell => cell.state === CellState.o)
    );
    if (winPath) {
      winPath.forEach(cell => (cell.highlight = true));
    }
    setTimeout(() => {
      if (winPath) {
        winPath.forEach(cell => (cell.highlight = false));
      }
      alert(message);
      this.newGame();
      this.allowClicks = true;
    }, 2000);
  }
}
