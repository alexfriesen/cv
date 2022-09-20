import { Component, inject, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ContentService } from '../content/content.service';
import { DataService } from '../data.service';
import { ContentType, Image } from '../models';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input()
  id: string;

  @Input()
  data = new Image();

  private readonly sanitizer = inject(DomSanitizer);
  private readonly dataService = inject(DataService);
  private readonly contentService = inject(ContentService);

  get image() {
    if (this.data) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.data.image);
    }
    return null;
  }

  async onEdit() {
    const data = this.data;
    const edited = await this.contentService.editData(ContentType.image, data);

    if (edited) {
      this.setItemData(edited);
    }
  }

  async onRemove() {
    this.dataService.removeContent(this.id);
  }

  private setItemData(data) {
    this.dataService.editContent(this.id, data);
  }
}
