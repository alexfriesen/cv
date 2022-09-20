import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../@shared/shared.module';
import { TextComponent } from './text.component';
import { TextFormComponent } from './form/form.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    declarations: [
        TextComponent,
        TextFormComponent,
    ],
    exports: [
        TextComponent
    ]
})
export class TextModule { }
