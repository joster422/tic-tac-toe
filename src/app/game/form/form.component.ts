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
  selector: "ttt-form[model]",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent implements OnInit, OnDestroy {
  @Input() model!: Form;

  @Output() restart = new EventEmitter();

  restart$ = new Subject();

  constructor() { }

  ngOnInit() {
    this.restart$.pipe(debounceTime(500)).subscribe(() => this.restart.emit());
  }

  ngOnDestroy() {
    this.restart$.complete();
  }
}
