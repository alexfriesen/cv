import { Injectable } from '@angular/core';

import { DataService } from '../data.service';
import { Theme } from '../models/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    private readonly dataService: DataService
  ) { }

  applyTheme() {
    this.updateTheme(this.getTheme());
  }

  getTheme() {
    return this.dataService.getData().theme;
  }

  reset() {
    this.updateTheme(new Theme());
  }

  updateTheme(theme: Theme) {
    const element = document.querySelector<HTMLElement>('.page');

    Object.keys(theme).forEach((key) => {
      element.style.setProperty(`--${key}`, theme[key]);
    });

    const data = this.dataService.getData();

    const updated = {
      ...data,

      theme,
    };

    this.dataService.setData(updated);

  }

}
