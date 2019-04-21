import { Component, forwardRef, Input } from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from "@angular/forms";

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
  @Input() label = "";

  control: FormControl;

  constructor() {
    this.control = new FormControl(false);
    this.control.valueChanges.subscribe((value: boolean) =>
      this.onChange(value)
    );
  }

  writeValue(value: boolean) {
    this.control.setValue(value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onChange(value: boolean) {}

  onTouched() {}

  setDisabledState(isDisabled: boolean) {
    this.control[isDisabled ? "disable" : "enable"]();
  }
}
