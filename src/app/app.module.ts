import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { GameComponent } from "./game/game.component";
import { FormComponent } from "./game/form/form.component";
import { ToggleComponent } from "./game/form/toggle/toggle.component";

@NgModule({
  declarations: [AppComponent, GameComponent, FormComponent, ToggleComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
