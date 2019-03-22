import { Component, OnInit } from "@angular/core";
import { debounceTime } from "rxjs/operators";
import { Game } from "./game";
import { Cell } from "./cell";
import { MenuService } from "../menu/menu.service";
import { Bot } from "./bot";
import {
  trigger,
  style,
  state,
  transition,
  animate,
  keyframes,
  group
} from "@angular/animations";
import { CellState } from "./cell-state.enum";

@Component({
  selector: "tac-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"],
  animations: [
    trigger("markCell", [
      state("X", style({ backgroundColor: "*", color: "*" })),
      state("O", style({ backgroundColor: "*", color: "*" })),
      transition(
        "* => X",
        animate(
          "2s",
          keyframes([
            style({ backgroundColor: "#EFF" }),
            style({ backgroundColor: "#FEE" }),
            style({ backgroundColor: "#EFF", color: "blue" })
          ])
        )
      ),
      transition(
        "* => O",
        group([
          animate(
            "2s",
            keyframes([style({ color: "orange" }), style({ color: "*" })])
          ),
          animate(
            "2s",
            keyframes([
              style({ backgroundColor: "#FEE" }),
              style({ backgroundColor: "#EFF" }),
              style({ backgroundColor: "#FEE" })
            ])
          )
        ])
      )
    ])
  ]
})
export class GameComponent implements OnInit {
  bot?: Bot;
  game?: Game;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.newGame();
    this.menuService.form
      .get("bot")!
      .valueChanges.pipe(debounceTime(500))
      .subscribe(() => this.newGame());
  }

  click(cell: Cell) {
    if (!this.game) return;
    switch (this.game.choose(cell)) {
      case false:
        this.menuService.isBotEnabled && this.botMove();
        return;
      case true:
        this.game.turnState === CellState.x
          ? alert(`${this.menuService.x} Wins`)
          : alert(`${this.menuService.o} Wins`);
        break;
      case null:
        alert("Draw");
        break;
    }
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    if (!this.menuService.isBotEnabled) return;
    this.bot = new Bot(this.menuService.isBotAllowedCenter);
    if (!this.menuService.isBotFirst) return;
    this.botMove();
  }

  private botMove() {
    if (!this.game || !this.bot) return;
    switch (this.game.choose(this.bot.getMove(this.game))) {
      case false:
        return;
      case true:
        this.game.turnState === CellState.x
          ? alert(`${this.menuService.x} Wins`)
          : alert(`${this.menuService.o} Wins`);
        break;
      case null:
        alert("Draw");
        break;
    }
    this.newGame();
  }
}
