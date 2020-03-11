import { Component } from '@angular/core';

import { Game } from './game';
import { Bot } from './bot';
import { Cell } from './cell/cell';
import { Form } from './form/form';

@Component({
  selector: 'ttt-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  allowClicks = true;
  game = new Game();
  bot = new Bot();
  form = new Form();

  constructor() { }

  async claim(cell: Cell) {
    if (!this.allowClicks) return;

    switch (this.game.didWin(cell)) {
      case null:
        this.newGame();
        return;
      case 'o':
        await this.endGame(`O Wins`);
        return;
      case 'x':
        await this.endGame(`X Wins`);
        return;
      case false:
        if (this.form.isBotEnabled)
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
      case 'o':
        await this.endGame(`Bot O Wins`)
        return;
      case 'x':
        await this.endGame(`Bot X Wins`)
        return;
      case undefined:
        throw new Error('bot should never play a claimed cell');
    }
  }

  private async endGame(message: string) {
    this.allowClicks = false;
    if (this.game.winPath !== undefined)
      this.game.winPath.forEach(cell => (cell.highlight = true))
    await new Promise(r => window.setTimeout(() => r(), 1000));
    alert(message);
    this.allowClicks = true;
    this.newGame();
  }
}
