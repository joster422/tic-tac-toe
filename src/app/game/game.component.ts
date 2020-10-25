import { Component, HostListener } from '@angular/core';

import { Bot, Cell, Game } from '../models';
import { FormService } from './form/form.service';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'ttt-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  allowClicks = true;
  game!: Game;
  bot = new Bot();

  constructor(
    private formService: FormService,
    private localStorageService: LocalStorageService
  ) {
    if (this.localStorageService.form !== null)
      this.formService.model = this.localStorageService.form;
    this.newGame();
  }

  @HostListener('window:unload')
  onBeforeUnload(): void {
    this.localStorageService.unload(
      this.game.grid,
      this.formService.model
    );
  }

  claim(cell: Cell): void {
    if (!this.allowClicks) return;

    if (this.game.win(cell.x, cell.y)) {
      this.endGame();
      return;
    }

    if (this.game.areNoMovesRemaining) {
      this.newGame(true);
      return;
    }

    if (this.formService.model.isBotEnabled)
      this.botClaim();
  }

  newGame(reset = false): void {
    if (reset)
      this.localStorageService.removeGame();
    let gameGrid = this.localStorageService.game;
    if (gameGrid === null)
      gameGrid = this.createGrid();
    this.game = new Game(gameGrid);
    if (!this.formService.model.isBotEnabled)
      return;
    this.bot = new Bot(this.formService.model.botFirstMove);
    if (this.game.moves.length !== 9 || !this.formService.model.isBotFirst)
      return;
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
    this.allowClicks = false;
    await new Promise(r => window.setTimeout(() => r(), 2500));
    this.allowClicks = true;
    this.newGame(true);
  }

  private createGrid(): Cell[] {
    const temp = [];
    for (let y = 0; y < 3; y++)
      for (let x = 0; x < 3; x++)
        temp.push(new Cell(x, y));
    return temp;
  }
}
