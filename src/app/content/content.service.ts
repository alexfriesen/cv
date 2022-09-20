import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';

import { TextFormComponent } from '../text/form/form.component';
import { ImageFormComponent } from '../image/form/form.component';
import { TimelineFormComponent } from '../timeline/form/form.component';
import { ContentType } from '../models';

@Injectable({ providedIn: 'root' })
export class ContentService {

  constructor(
    private readonly dialog: MatDialog,
  ) { }

  async editData(type: ContentType, data: any) {

    const updatedData = await this.openDialog(type, data);
    if (!updatedData) return data;

    return updatedData;

  }

  async createData(type: ContentType) {

    return await this.openDialog(type);

  }

  private openDialog(type: ContentType, data = {}) {
    let dialog: any = TextFormComponent;
    switch (type) {
      case ContentType.text:
        dialog = TextFormComponent;
        break;

      case ContentType.image:
        dialog = ImageFormComponent;
        break;

      case ContentType.timeline:
        dialog = TimelineFormComponent;
        break;
    }

    return firstValueFrom(this.dialog.open(dialog, { data }).afterClosed());
  }

}
