import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Theme } from 'src/app/models/theme';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-theme-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class ThemeFormComponent implements OnDestroy {

  form: FormGroup;
  formSubscription: Subscription;

  constructor(
    private readonly themeService: ThemeService,
  ) {
    const theme = this.themeService.getTheme();

    this.form = new FormGroup({
      highlightColor: new FormControl(theme.highlightColor, Validators.required),

      headlineFontType: new FormControl(theme.headlineFontType, Validators.required),
      headlineFontWeight: new FormControl(theme.headlineFontWeight, Validators.required),
      headlineFontSize: new FormControl(theme.headlineFontSize, Validators.required),
      headlineColor: new FormControl(theme.headlineColor, Validators.required),
      headlineBorderType: new FormControl(theme.headlineBorderType),

      textFontType: new FormControl(theme.textFontType, Validators.required),
      textFontWeight: new FormControl(theme.textFontWeight, Validators.required),
      textFontSize: new FormControl(theme.textFontSize, Validators.required),
      textColor: new FormControl(theme.textColor, Validators.required),
    });

    this.formSubscription = this.form.valueChanges.subscribe(themeData => {
      this.themeService.updateTheme(themeData);
    });
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
  }

  onReset() {
    this.form.patchValue(new Theme());
  }

}
