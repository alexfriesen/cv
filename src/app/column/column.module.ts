import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { TextModule } from '../text/text.module';
import { TimelineModule } from '../timeline/timeline.module';
import { ColumnComponent } from './column.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,

    TimelineModule,
    TextModule,
  ],
  declarations: [
    ColumnComponent
  ],
  exports: [
    ColumnComponent
  ],
})
export class ColumnModule { }
