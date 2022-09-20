import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { ImageModule } from '../image/image.module';
import { TextModule } from '../text/text.module';
import { TimelineModule } from '../timeline/timeline.module';
import { Content } from '../models';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  imports: [
    CommonModule,
    ImageModule,
    TimelineModule,
    TextModule,
  ],
  standalone: true,
})
export class ContentComponent {
  @Input()
  content: Content;

  @HostBinding('style.height')
  get getWidth() { return this.content.height ? `${this.content.height}%` : 'auto'; }
}
