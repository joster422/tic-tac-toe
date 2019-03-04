import { Component, OnInit } from "@angular/core";
import { Game } from "./game";
import { Cell } from "./cell";

@Component({
  selector: "tac-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  game = new Game();

  constructor() {}

  ngOnInit() {}

  click(cell: Cell) {
    if (this.game.choose(cell.x, cell.y)) {
      this.newGame();
    }
  }

  newGame() {
    this.game = new Game();
  }
}
