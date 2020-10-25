import { Injectable } from '@angular/core';
import { Cell, Form } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  readonly version = '001';
  readonly versionKey = 'version';
  readonly gameKey = 'gameGrid';
  readonly formKey = 'form';

  constructor() {
    const item = window.localStorage.getItem(this.versionKey);
    if (item === this.version)
      return;
    window.localStorage.removeItem(this.versionKey);
    window.localStorage.removeItem(this.gameKey);
    window.localStorage.removeItem(this.formKey);
  }

  get form(): Form | null {
    const form = window.localStorage.getItem(this.formKey);
    if (form === null)
      return null;
    return JSON.parse(form);
  }

  get game(): Cell[] | null {
    const game = window.localStorage.getItem(this.gameKey);
    if (game === null)
      return null;
    return JSON.parse(game);
  }

  removeGame(): void {
    window.localStorage.removeItem(this.gameKey);
  }

  unload(game: Cell[], form: Form): void {
    window.localStorage.setItem(this.versionKey, this.version);
    window.localStorage.setItem(this.gameKey, JSON.stringify(game));
    window.localStorage.setItem(this.formKey, JSON.stringify(form));
  }
}
