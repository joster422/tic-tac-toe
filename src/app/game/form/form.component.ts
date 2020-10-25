import { Component, Output, EventEmitter, Input } from '@angular/core';
import { botFirstMoves } from 'src/app/models';

import { FormService } from './form.service';

@Component({
  selector: 'ttt-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  booleans = [
    { key: true, value: 'Yes' },
    { key: false, value: 'No' }
  ];
  botFirstMoves = botFirstMoves.map(move => ({
    key: move,
    value: move.charAt(0).toUpperCase() + move.slice(1)
  }));

  @Input() disabled = false;

  @Output() restart = new EventEmitter();

  constructor(public formService: FormService) { }
}
