import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cell } from './cell';
import { CellState } from './cell.enum';

@Component({
  selector: 'ttt-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {
  @Input() cell!: Cell;
  @Input() hoverState!: CellState;

  @Output() click = new EventEmitter();

  cellState = CellState;

  constructor() { }
}
