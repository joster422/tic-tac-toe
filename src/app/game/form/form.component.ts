import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";
import { debounceTime } from "rxjs/operators";

const botXName = "Bot X";
const botOName = "bOt";
const playerXName = "X-treme";
const playerOName = "O-wesome";

@Component({
  selector: "tac-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent implements OnInit {
  @Input() form!: FormGroup;
  @Output() formChange = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.form
      .get("bot")!
      .get("isEnabled")!
      .valueChanges.subscribe(value => this.changeBotIsEnabled(value));

    this.form
      .get("bot")!
      .get("isFirst")!
      .valueChanges.subscribe(value => this.changeBotIsFirst(value));

    this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => this.formChange.emit());
  }

  changeBotIsEnabled(value: boolean) {
    const action = value ? "enable" : "disable";
    this.form
      .get("bot")!
      .get("isFirst")!
      [action]({
        emitEvent: false
      });
    if (this.form.get("bot")!.get("isFirst")!.value) {
      this.form
        .get("bot")!
        .get("isAllowedCenterFirst")!
        [action]({
          emitEvent: false
        });
    }

    if (value) {
      this.form.get("x")!.patchValue(playerXName);
      this.form.get("o")!.patchValue(botOName);
    } else {
      this.form.get("x")!.patchValue(playerXName);
      this.form.get("o")!.patchValue(playerOName);
    }
  }

  changeBotIsFirst(value: boolean) {
    this.form
      .get("bot")!
      .get("isAllowedCenterFirst")!
      [value ? "enable" : "disable"]({ emitEvent: false });
    if (value) {
      this.form.get("x")!.patchValue(botXName);
      this.form.get("o")!.patchValue(playerOName);
    } else {
      this.form.get("x")!.patchValue(playerXName);
      this.form.get("o")!.patchValue(botOName);
    }
  }
}
