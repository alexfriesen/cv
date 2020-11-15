import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { ConfirmDialogModule } from './confirm-dialog/confirm-dialog.module';
import { PrivacyDialogModule } from './privacy-dialog/privacy-dialog.module';

@NgModule({
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    MaterialModule,
    ConfirmDialogModule,
    PrivacyDialogModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,

    MaterialModule,
  ],
})
export class SharedModule { }
