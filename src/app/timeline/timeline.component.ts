import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { TimelineFormComponent } from './form/form.component';
import { ColumnService } from '../column/column.service';

export class Timeline {
  constructor(
    public headline = '',
    public items = []
  ) { }
}

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
    private readonly columnService: ColumnService,
  ) { }

  async onEdit() {
    const data = this.data;
    const edited = await this.dialog.open(TimelineFormComponent, { data }).afterClosed().toPromise();

    this.setItemData(edited);
  }

  setItemData(data) {
    this.columnService.updateColumnItem(this.rowIndex, data);
  }
}
