import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ItemType, Item } from 'src/app/models/item';
import { TextFormComponent } from './text/form/form.component';
import { ImageFormComponent } from './image/form/form.component';
import { TimelineFormComponent } from './timeline/form/form.component';

@Injectable()
export class ContainerItemService {

  constructor(
    private readonly dialog: MatDialog,
  ) { }

  async edit(item: Item) {

    let dialog: any = TextFormComponent;
    switch (item.type) {
      case ItemType.Text:
        dialog = TextFormComponent;
        break;

      case ItemType.Image:
        dialog = ImageFormComponent;
        break;

      case ItemType.Timeline:
        dialog = TimelineFormComponent;
        break;
    }

    const data = await this.dialog.open(dialog, { data: item.data }).afterClosed().toPromise();
    if (!data) return item.data;

    return data;

  }
}
