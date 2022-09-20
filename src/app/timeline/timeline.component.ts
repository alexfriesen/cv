import { Component, inject, Input } from '@angular/core';
import { ContentService } from '../content/content.service';
import { DataService } from '../data.service';
import { ContentType, Timeline } from '../models';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {
  @Input()
  id: string;

  @Input()
  data = new Timeline();

  private readonly dataService = inject(DataService);
  private readonly contentService = inject(ContentService);

  async onEdit() {
    const data = this.data;
    const edited = await this.contentService.editData(ContentType.timeline, data);

    if (edited) {
      this.setItemData(edited);
    }
  }

  async onRemove() {
    this.dataService.removeContent(this.id);
  }

  setItemData(data) {
    this.dataService.editContent(this.id, data);
  }
}
