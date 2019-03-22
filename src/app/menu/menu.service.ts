import { Injectable } from "@angular/core";
import { FormBuilder } from "@angular/forms";

const botXName = "Bot X";
const botOName = "bOt";
const playerXName = "X-treme";
const playerOName = "O-wesome";

@Injectable({
  providedIn: "root"
})
export class MenuService {
  form = this.formBuilder.group({
    x: [playerXName],
    o: [botOName],
    bot: this.formBuilder.group({
      isBotEnabled: [true],
      isBotFirst: [false],
      isBotAllowedCenter: [true]
    })
  });

  constructor(private formBuilder: FormBuilder) {
    this.form
      .get("bot")!
      .get("isBotEnabled")!
      .valueChanges.subscribe((value: boolean) => {
        const action = value ? "enable" : "disable";
        this.form
          .get("bot")!
          .get("isBotFirst")!
          [action]({
            emitEvent: false
          });
        this.form
          .get("bot")!
          .get("isBotAllowedCenter")!
          [action]({
            emitEvent: false
          });

        if (value) {
          this.form.get("x")!.patchValue(playerXName);
          this.form.get("o")!.patchValue(botOName);
        } else {
          this.form.get("x")!.patchValue(playerXName);
          this.form.get("o")!.patchValue(playerOName);
        }
      });

    this.form
      .get("bot")!
      .get("isBotFirst")!
      .valueChanges.subscribe((value: boolean) => {
        if (value) {
          this.form.get("x")!.patchValue(botXName);
          this.form.get("o")!.patchValue(playerOName);
        } else {
          this.form.get("x")!.patchValue(playerXName);
          this.form.get("o")!.patchValue(botOName);
        }
      });
  }

  get isBotAllowedCenter(): boolean {
    return this.form.get("bot")!.get("isBotAllowedCenter")!.value;
  }

  get isBotEnabled(): boolean {
    return this.form.get("bot")!.get("isBotEnabled")!.value;
  }

  get isBotFirst(): boolean {
    return this.form.get("bot")!.get("isBotFirst")!.value;
  }

  get o(): string {
    return this.form.get("o")!.value;
  }

  get x(): string {
    return this.form.get("x")!.value;
  }
}
