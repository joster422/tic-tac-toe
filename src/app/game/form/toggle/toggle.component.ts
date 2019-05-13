import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "tac-toggle",
  templateUrl: "./toggle.component.html",
  styleUrls: ["./toggle.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ToggleComponent)
    }
  ]
})
export class ToggleComponent implements ControlValueAccessor {
  @Input() disabled = false;

  model = false;

  constructor() {}

  click() {
    if (this.disabled) return;
    this.model = !this.model;
    this.onChange(this.model);
  }

  keypress() {
    if (this.disabled) return;
    this.model = !this.model;
    this.onChange(this.model);
  }

  onChange(value: boolean) {}

  onTouched() {}

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  writeValue(value: boolean) {
    this.model = value;
  }
}
