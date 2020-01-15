import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { ImageComponent } from './image.component';
import { ImageFormComponent } from './form/form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    ImageComponent,
    ImageFormComponent,
  ],
  exports: [
    ImageComponent
  ],
  entryComponents: [
    ImageFormComponent,
  ]
})
export class ImageModule { }
