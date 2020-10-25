import { Component, Input, Output, EventEmitter } from '@angular/core';

import { FormService } from '../form/form.service';
import { Cell } from 'src/app/models';

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

  constructor(public formService: FormService) { }

  get isBot(): boolean {
    if (!this.formService.model.isBotEnabled)
      return false;
    return this.formService.model.isBotFirst
      ? this.cell.state === 'x'
      : this.cell.state === 'o';
  }

  get label(): string | null {
    if (this.isBot)
      return 'Bot';
    if (this.cell.state === 'x')
      return this.formService.model.player1;
    if (this.cell.state === 'o')
      return this.formService.model.player2;
    return null;
  }
}
