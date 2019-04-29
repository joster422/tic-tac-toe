import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  Input
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { Form } from "./form.model";
import { Subject } from "rxjs";

@Component({
  selector: "tac-form[model]",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent implements OnInit {
  @ViewChild("form") form!: NgForm;

  @Input() model!: Form;

  @Output() restart = new EventEmitter();

  subject = new Subject();

  constructor() {}

  ngOnInit() {
    this.subject.pipe(debounceTime(500)).subscribe(() => this.restart.emit());
    this.form.valueChanges!.subscribe(() => this.subject.next());
  }
}
