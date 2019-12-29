import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Column, ColumnItemType, ColumnItem } from '../models/column';
import { ColumnService } from './column.service';
import { Timeline } from '../timeline/timeline.component';
import { ColumnItemDialogComponent } from './item/dialog/dialog.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
  @Input()
  data: Column;

  @Input()
  index;

  constructor(
    private readonly dialog: MatDialog,
    private readonly columnService: ColumnService
  ) { }

  async onAddRow() {
    const options = await this.dialog.open(ColumnItemDialogComponent).afterClosed().toPromise()
    let data
    switch (options.type) {
      case ColumnItemType.Text:
        data = new ColumnItem<Text>(options.type, new Text())
        break;

      case ColumnItemType.Timeline:
        data = new ColumnItem<Timeline>(options.type, new Timeline())
        break;

      default:
        break;
    }
    this.columnService.addColumnItem(this.index, data);
  }
}
