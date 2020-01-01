import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { TextFormComponent } from './form/form.component';
import { ColumnService } from '../column/column.service';

export class Text {

  constructor(
    public headline = '',
    public description = ''
  ) { }

}

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
    private readonly dialog: MatDialog,
    private readonly columnService: ColumnService,
  ) { }

  async onEdit() {
    const data = this.data;
    const edited = await this.dialog.open(TextFormComponent, { data }).afterClosed().toPromise();

    this.setItemData(edited);
  }

  setItemData(data) {
    this.columnService.updateColumnItem(this.rowIndex, data);
  }
}
