import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { TextFormComponent } from './form/form.component';
import { ContainerService } from '../../container.service';

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
    private readonly containerService: ContainerService,
  ) { }

  async onEdit() {
    const data = this.data;
    const edited = await this.dialog.open(TextFormComponent, { data }).afterClosed().toPromise();

    if (edited) {
      this.setItemData(edited);
    }
  }

  setItemData(data) {
    this.containerService.updateItem(this.rowIndex, data);
  }
}
