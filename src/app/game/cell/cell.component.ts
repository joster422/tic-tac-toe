import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cell } from './cell';

@Component({
  selector: 'ttt-cell[cell]',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {
  @Input() cell!: Cell;
  @Input() gameTurn: 'x' | 'o' = 'x';
  @Input() highlight = false;
  @Input() disabled = false;

  @Output() claim = new EventEmitter<Cell>();

  constructor() { }
}
