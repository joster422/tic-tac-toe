import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cell } from './cell';

@Component({
  selector: 'ttt-cell[cell][hoverState]',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {
  @Input() cell!: Cell;
  @Input() hoverState!: 'x' | 'o';

  @Output() claim = new EventEmitter<Cell>();

  constructor() { }
}
