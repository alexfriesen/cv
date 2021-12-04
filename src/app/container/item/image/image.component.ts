import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Image, ItemType } from '../../../models';
import { ContainerService } from '../../container.service';
import { ContainerItemService } from '../item.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input()
  rowIndex: number;

  @Input()
  data = new Image();

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly containerService: ContainerService,
    private readonly containerItemService: ContainerItemService,
  ) { }

  get image() {
    if (this.data) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.data.image);
    }
    return null;
  }

  async onEdit() {
    const data = this.data;
    const edited = await this.containerItemService.edit({ type: ItemType.image, data });

    if (edited) {
      this.setItemData(edited);
    }
  }

  async onRemove() {
    this.containerService.removeItem(this.rowIndex);
  }

  private setItemData(data) {
    this.containerService.updateItem(this.rowIndex, data);
  }
}
