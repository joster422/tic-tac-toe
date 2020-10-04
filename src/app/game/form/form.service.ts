import { Injectable } from '@angular/core';
import { Form } from './form';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  model = new Form();

  constructor() { }
}
