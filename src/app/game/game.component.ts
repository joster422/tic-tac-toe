import { Component, HostListener } from '@angular/core';

import { Game } from './game';
import { Bot } from './bot';
import { Cell } from './cell/cell';
import { FormService } from './form/form.service';

@Component({
  selector: 'ttt-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  allowClicks = true;
  game!: Game;
  bot = new Bot();

  constructor(private formService: FormService) {
    const lsItem = window.localStorage.getItem('form');
    if (lsItem !== null)
      this.formService.model = JSON.parse(lsItem);
    this.newGame();
  }

  @HostListener('window:unload')
  onBeforeUnload(): void {
    window.localStorage.setItem('gameGrid', JSON.stringify(this.game.grid));
    window.localStorage.setItem('form', JSON.stringify(this.formService.model));
  }

  claim(cell: Cell): void {
    if (!this.allowClicks) return;

    if (this.game.win(cell.x, cell.y)) {
      this.endGame();
      return;
    }

    if (this.game.areNoMovesRemaining) {
      window.localStorage.removeItem('gameGrid');
      this.newGame();
      return;
    }

    if (this.formService.model.isBotEnabled)
      this.botClaim();
  }

  newGame(): void {
    const lsItem = window.localStorage.getItem('gameGrid');
    let grid = this.createGrid();
    if (lsItem !== null)
      grid = JSON.parse(lsItem);
    this.game = new Game(grid);
    if (!this.formService.model.isBotEnabled) return;
    this.bot = new Bot(this.formService.model.isBotCenterFirst);
    if (!this.formService.model.isBotFirst) return;
    this.botClaim();
  }

  private async botClaim(): Promise<void> {
    this.allowClicks = false;
    const claim = await this.bot.getClaim(this.game);
    this.allowClicks = true;

    if (this.game.win(claim.x, claim.y)) {
      this.endGame();
      return;
    }

    if (this.game.areNoMovesRemaining)
      this.newGame();
  }

  private async endGame(): Promise<void> {
    window.localStorage.removeItem('gameGrid');
    this.allowClicks = false;
    await new Promise(r => window.setTimeout(() => r(), 2500));
    this.allowClicks = true;
    this.newGame();
  }

  private createGrid(): Cell[] {
    const temp = [];
    for (let y = 0; y < 3; y++)
      for (let x = 0; x < 3; x++)
        temp.push(new Cell(x, y));
    return temp;
  }
}
