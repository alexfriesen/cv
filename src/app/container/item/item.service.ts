import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';

import { ItemType, Item } from '../../models/item';
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
      case ItemType.text:
        dialog = TextFormComponent;
        break;

      case ItemType.image:
        dialog = ImageFormComponent;
        break;

      case ItemType.timeline:
        dialog = TimelineFormComponent;
        break;
    }

    const data = await firstValueFrom(this.dialog.open(dialog, { data: item.data }).afterClosed());
    if (!data) return item.data;

    return data;

  }
}
