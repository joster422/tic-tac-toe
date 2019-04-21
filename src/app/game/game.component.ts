import { Component } from "@angular/core";
import { Bot } from "./bot";
import { Cell } from "./cell";
import { Game } from "./game";

import { CellState } from "./cell-state.enum";
import { FormBuilder } from "@angular/forms";

const botOName = "bOt";
const playerXName = "X-treme";

interface FormValue {
  x: string;
  o: string;
  bot: {
    isEnabled: boolean;
    isFirst: boolean;
    isAllowedCenterFirst: boolean;
  };
}

@Component({
  selector: "tac-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent {
  allowClicks = true;
  bot = new Bot();
  cellState = CellState;
  form = this.formBuilder.group({
    x: [playerXName],
    o: [botOName],
    bot: this.formBuilder.group({
      isEnabled: [true],
      isFirst: [false],
      isAllowedCenterFirst: [{ value: true, disabled: true }]
    })
  });
  game = new Game();

  constructor(private formBuilder: FormBuilder) {}

  get formValue(): FormValue {
    return this.form.value as FormValue;
  }

  click(cell: Cell) {
    if (!this.allowClicks) return;
    switch (this.game.choose(cell)) {
      case false:
        this.formValue.bot.isEnabled && this.botMove();
        return;
      case true:
        this.game.turnState === CellState.o
          ? this.endGame(`${this.formValue.x} Wins`)
          : this.endGame(`${this.formValue.o} Wins`);
        break;
      case null:
        this.endGame("Draw");
        break;
    }
  }

  newGame() {
    this.game = new Game();
    if (!this.formValue.bot.isEnabled) return;
    this.bot = new Bot(this.formValue.bot.isAllowedCenterFirst);
    if (!this.formValue.bot.isFirst) return;
    this.botMove();
  }

  private botMove() {
    switch (this.game.choose(this.bot.getMove(this.game))) {
      case false:
        return;
      case true:
        this.game.turnState === CellState.o
          ? this.endGame(`${this.formValue.x} Wins`)
          : this.endGame(`${this.formValue.o} Wins`);
        break;
      case null:
        this.endGame("Draw");
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
