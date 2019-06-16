import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlModule } from 'form-control';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { FormComponent } from './game/form/form.component';

@NgModule({
  declarations: [AppComponent, GameComponent, FormComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormControlModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
