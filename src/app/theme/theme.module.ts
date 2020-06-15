import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../@shared/shared.module';
import { ThemeFormComponent } from './form/form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    ThemeFormComponent,
  ],
  exports: [
    ThemeFormComponent
  ],
})
export class ThemeModule { }
