import { Component } from '@angular/core';
import { Bot } from './bot';
import { Cell } from './cell';
import { Game } from './game';

import { CellState } from './cell-state.enum';
import { Form } from './form/form.model';

@Component({
  selector: 'tac-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  allowClicks = true;
  bot = new Bot();
  cellState = CellState;
  game = new Game();
  form = new Form();

  constructor() {}

  click(cell: Cell) {
    if (!this.allowClicks) return;
    switch (this.game.choose(cell)) {
      case false:
        this.form.isEnabled && this.botMove();
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
    if (!this.form.isEnabled) return;
    this.bot = new Bot(this.form.isCenterFirst);
    if (!this.form.isFirst) return;
    this.botMove();
  }

  private botMove() {
    switch (this.game.choose(this.bot.getMove(this.game))) {
      case false:
        return;
      case true:
        this.game.turnState === CellState.o
          ? this.endGame(`Bot X Wins`)
          : this.endGame(`Bot O Wins`);
        break;
      case null:
        // draw
        this.newGame();
        break;
    }
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
