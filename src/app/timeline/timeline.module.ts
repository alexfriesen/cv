import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../@shared/shared.module';
import { TimelineComponent } from './timeline.component';
import { TimelineFormComponent } from './form/form.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    declarations: [
        TimelineComponent,
        TimelineFormComponent,
    ],
    exports: [
        TimelineComponent
    ]
})
export class TimelineModule { }
