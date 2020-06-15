import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../@shared/shared.module';
import { TemplateDialogComponent } from './dialog/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    TemplateDialogComponent,
  ],
  exports: [
    TemplateDialogComponent,
  ],
  entryComponents: [
    TemplateDialogComponent,
  ]
})
export class TemplateModule { }
