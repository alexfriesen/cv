import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    ConfirmDialogComponent,
  ],
  exports: [
    ConfirmDialogComponent,
  ],
})
export class ConfirmDialogModule { }
