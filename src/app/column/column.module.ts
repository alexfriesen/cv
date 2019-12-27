import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { TextModule } from '../text/text.module';
import { TimelineModule } from '../timeline/timeline.module';
import { ColumnComponent } from './column.component';
import { ColumnItemDialogComponent } from './item/dialog/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,

    TimelineModule,
    TextModule,
  ],
  declarations: [
    ColumnComponent,
    ColumnItemDialogComponent,
  ],
  exports: [
    ColumnComponent,
  ],
  entryComponents: [
    ColumnItemDialogComponent,
  ]
})
export class ColumnModule { }
