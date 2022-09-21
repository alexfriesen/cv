import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MaterialModule } from '../../@shared/material.module';
import { ContentService, DataService } from '../../services';
import { ContentType, Timeline } from '../../models';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule],
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
