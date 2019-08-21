import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnDestroy
} from "@angular/core";
import { debounceTime } from "rxjs/operators";
import { Form } from "./form.model";
import { Subject } from "rxjs";

@Component({
  selector: "ttt-form[model][restart]",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent {
  @Input() disabled!: boolean;
  @Input() model!: Form;

  @Output() restart = new EventEmitter();

  constructor() { }
}
