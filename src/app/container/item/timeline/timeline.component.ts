import { Component, Input } from '@angular/core';

import { ItemType } from 'src/app/models/item';
import { Timeline } from '../../../models/timeline';
import { ContainerService } from '../../container.service';
import { ContainerItemService } from '../item.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {
  @Input()
  rowIndex: number;

  @Input()
  data = new Timeline();

  constructor(
    private readonly containerService: ContainerService,
    private readonly containerItemService: ContainerItemService,
  ) { }

  async onEdit() {
    const data = this.data;
    const edited = await this.containerItemService.edit({ type: ItemType.Timeline, data });

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
