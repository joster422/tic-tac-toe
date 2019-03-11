import { Injectable } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class MenuService {
  form = this.formBuilder.group({
    isBotEnabled: [true],
    isBotFirst: [false],
    isBotAllowedCenter: [true]
  });

  constructor(private formBuilder: FormBuilder) {
    this.form.get("isBotEnabled").valueChanges.subscribe(value => {
      const action = value ? "enable" : "disable";
      this.form.get("isBotFirst")[action]({
        emitEvent: false
      });
      this.form.get("isBotAllowedCenter")[action]({
        emitEvent: false
      });
    });
  }
}
