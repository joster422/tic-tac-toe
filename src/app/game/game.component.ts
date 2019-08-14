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

  async claim(cell: Cell) {
    if (!this.allowClicks) return;

    switch (this.game.didWin(cell)) {
      case null:
        this.newGame();
        return;
      case CellState.o:
        await this.endGame(`O Wins`);
        return;
      case CellState.x:
        await this.endGame(`X Wins`);
        return;
      case false && this.form.isBotEnabled:
        this.botClaim();
    }
  }

  newGame() {
    this.game = new Game();
    if (!this.form.isBotEnabled) return;
    this.bot = new Bot(this.form.isBotCenterFirst);
    if (!this.form.isBotFirst) return;
    this.botClaim();
  }

  private async botClaim() {
    switch (this.game.didWin(this.bot.getClaim(this.game))) {
      case null:
        this.newGame();
        return;
      case CellState.o:
        await this.endGame(`Bot O Wins`)
        return;
      case CellState.x:
        await this.endGame(`Bot X Wins`)
        return;
      case undefined:
        throw new Error('bot should never play a claimed cell');
    }
  }

  private async endGame(message: string) {
    this.allowClicks = false;
    this.game.paths
      .find(path => path.every(cell => cell.state === CellState.x) || path.every(cell => cell.state === CellState.o))!
      .forEach(cell => (cell.highlight = true));

    await new Promise(r => window.setTimeout(() => r(), 1000));

    alert(message);
    this.allowClicks = true;
    this.newGame();
  }
}
