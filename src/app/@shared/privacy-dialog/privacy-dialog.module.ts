import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacyDialogComponent } from './privacy-dialog.component';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    PrivacyDialogComponent,
  ],
  exports: [
    PrivacyDialogComponent,
  ],
})
export class PrivacyDialogModule { }
