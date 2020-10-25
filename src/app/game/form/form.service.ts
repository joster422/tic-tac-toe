import { Injectable } from '@angular/core';
import { Form } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  model = new Form();

  constructor() { }
}
