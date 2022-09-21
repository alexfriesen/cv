import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';

import { TextComponent } from '../text/text.component';
import { ImageComponent } from '../image/image.component';
import { TimelineComponent } from '../timeline/timeline.component';
import { Content } from '../../models';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  imports: [
    CommonModule,
    TextComponent,
    ImageComponent,
    TimelineComponent,
  ],
  standalone: true,
})
export class ContentComponent {
  @Input()
  content: Content;

  @HostBinding('style.height')
  get getWidth() { return this.content.height ? `${this.content.height}%` : 'auto'; }
}
