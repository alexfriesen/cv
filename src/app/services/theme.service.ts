import { Injectable } from '@angular/core';
import { createStore, setProps, withProps } from '@ngneat/elf';

import { defaultTheme, Theme } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  store = createStore(
    { name: 'theme' },
    withProps<Theme>(defaultTheme)
  );

  applyTheme() {
    this.updateTheme(this.getTheme());
  }

  getTheme() {
    return this.store.getValue();
  }

  reset() {
    this.updateTheme(defaultTheme);
  }

  updateTheme(theme: Theme) {
    const element = document.querySelector<HTMLElement>('.page');

    Object.keys(theme).forEach((key) => {
      element?.style?.setProperty(`--${key}`, theme[key]);
    });

    this.store.update(setProps(theme));
  }

}
