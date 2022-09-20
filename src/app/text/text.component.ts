import { Component, inject, Input } from '@angular/core';
import { ContentService } from '../content/content.service';
import { DataService } from '../data.service';
import { Text, ContentType } from '../models';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  @Input()
  id: string;

  @Input()
  data = new Text();

  private readonly dataService = inject(DataService);
  private readonly contentService = inject(ContentService);

  async onEdit() {
    const data = this.data;
    const edited = await this.contentService.editData(ContentType.text, data);

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
