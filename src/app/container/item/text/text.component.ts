import { Component, Input } from '@angular/core';

import { Text, ItemType } from '../../../models';
import { ContainerService } from '../../container.service';
import { ContainerItemService } from '../item.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  @Input()
  rowIndex: number;

  @Input()
  data = new Text();

  constructor(
    private readonly containerService: ContainerService,
    private readonly containerItemService: ContainerItemService,
  ) { }

  async onEdit() {
    const data = this.data;
    const edited = await this.containerItemService.edit({ type: ItemType.text, data });

    if (edited) {
      this.setItemData(edited);
    }
  }

  async onRemove() {
    this.containerService.removeItem(this.rowIndex);
  }

  setItemData(data) {
    this.containerService.updateItem(this.rowIndex, data);
  }
}
