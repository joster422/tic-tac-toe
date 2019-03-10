import { Component, OnInit } from "@angular/core";
import { MenuService } from "./menu.service";

@Component({
  selector: "tac-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {
  constructor(public menuService: MenuService) {}

  ngOnInit() {}
}
