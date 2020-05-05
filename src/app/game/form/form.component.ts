import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Form } from './form';

@Component({
  selector: 'ttt-form[model]',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  booleans = [
    { key: true, value: 'Yes' },
    { key: false, value: 'No' }
  ];

  @Input() disabled = false;
  @Input() model!: Form;

  @Output() restart = new EventEmitter();

  constructor() { }
}
