import { Injectable } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class MenuService {
  form = this.formBuilder.group({
    isBotEnabled: { value: false },
    isBotFirst: { value: false, disabled: true },
    isBotAllowedCenter: { value: true, disabled: true }
  });

  constructor(private formBuilder: FormBuilder) {
    this.form.valueChanges.subscribe(() => {
      const botAction = this.form.get("isBotEnabled").value
        ? "enable"
        : "disable";
      this.form.get("isBotFirst")[botAction]({
        emitEvent: false
      });
      this.form.get("isBotAllowedCenter")[botAction]({
        emitEvent: false
      });
    });
  }
}
