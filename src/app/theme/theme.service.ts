import { Injectable } from '@angular/core';
import { createStore, setProps, withProps } from '@ngneat/elf';

import { Theme } from '../models/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  store = createStore(
    { name: 'theme' },
    withProps<Theme>(new Theme())
  );

  applyTheme() {
    this.updateTheme(this.getTheme());
  }

  getTheme() {
    return this.store.getValue();
  }

  reset() {
    this.updateTheme(new Theme());
  }

  updateTheme(theme: Theme) {
    const element = document.querySelector<HTMLElement>('.page');

    Object.keys(theme).forEach((key) => {
      element?.style?.setProperty(`--${key}`, theme[key]);
    });

    this.store.update(setProps(theme));
  }

}
