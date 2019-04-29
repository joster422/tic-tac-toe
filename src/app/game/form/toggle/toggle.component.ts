import {
  Component,
  forwardRef,
  HostListener,
  HostBinding,
  ElementRef,
  Renderer2
} from "@angular/core";
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
  @HostBinding("tabindex")
  get tabindex() {
    if (!this.control) return "-1";
    return this.control.disabled ? "-1" : "0";
  }
  @HostListener("click", ["$event"]) onclick(event: MouseEvent) {
    event.preventDefault();
    if (!this.control || this.control.disabled) return;
    this.control.setValue(!this.control.value);
  }
  @HostListener("keypress") onkeypress() {
    if (!this.control || this.control.disabled) return;
    this.control.setValue(!this.control.value);
  }

  control: FormControl;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
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
    this.control.disabled
      ? this.renderer.setAttribute(
          this.elementRef.nativeElement,
          "disabled",
          "disabled"
        )
      : this.renderer.removeAttribute(
          this.elementRef.nativeElement,
          "disabled"
        );
  }
}
