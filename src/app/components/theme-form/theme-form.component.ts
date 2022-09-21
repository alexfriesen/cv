import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { MaterialModule } from '../../@shared/material.module';
import { defaultTheme } from '../../models';
import { ThemeService } from '../../services';

@Component({
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
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
    this.form.patchValue(defaultTheme);
  }

}
