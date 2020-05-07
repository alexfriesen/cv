import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Timeline } from '../../../models/timeline';
import { TimelineFormComponent } from './form/form.component';
import { ContainerService } from '../../container.service';

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
    private readonly dialog: MatDialog,
    private readonly containerService: ContainerService,
  ) { }

  async onEdit() {
    const data = this.data;
    const edited = await this.dialog.open(TimelineFormComponent, { data }).afterClosed().toPromise();

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
