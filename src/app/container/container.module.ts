import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../@shared/shared.module';
import { TextModule } from './item/text/text.module';
import { ImageModule } from './item/image/image.module';
import { TimelineModule } from './item/timeline/timeline.module';

import { ContainerComponent } from './container.component';
import { ContainerItemDialogComponent } from './item/dialog/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,

    ImageModule,
    TimelineModule,
    TextModule,
  ],
  declarations: [
    ContainerComponent,
    ContainerItemDialogComponent,
  ],
  exports: [
    ContainerComponent,
  ],
  entryComponents: [
    ContainerItemDialogComponent,
  ]
})
export class ContainerModule { }
