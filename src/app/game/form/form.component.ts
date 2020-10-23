import { Component, Output, EventEmitter, Input } from '@angular/core';

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

  @Input() disabled = false;

  @Output() restart = new EventEmitter();

  constructor(public formService: FormService) { }
}
