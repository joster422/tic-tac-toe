import { Component, OnInit } from "@angular/core";
import { Game } from "./game";
import { Cell } from "./cell";
import { MenuService } from "../menu/menu.service";
import { Bot } from "./bot";

@Component({
  selector: "tac-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  bot: Bot;
  game: Game;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.newGame();
    this.menuService.form.valueChanges.subscribe(() => this.newGame());
  }

  click(cell: Cell) {
    if (cell.state !== null) return;
    const move = this.game.choose(cell);
    if (move === null && this.menuService.form.get("isBotEnabled").value) {
      this.botMove();
      return;
    }
    move === true && alert("Player 1 Wins");
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    if (!this.menuService.form.get("isBotEnabled").value) return;
    this.bot = new Bot(this.menuService.form.get("isBotAllowedCenter").value);
    if (!this.menuService.form.get("isBotFirst").value) return;
    this.botMove();
  }

  botMove() {
    const move = this.game.choose(this.bot.getMove(this.game));
    if (move === null) return;
    move === true && alert("Bot Wins");
    // this.newGame();
  }
}
