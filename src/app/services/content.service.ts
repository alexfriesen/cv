import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';

import { ContentType } from '../models';
import { TextFormComponent } from '../components/text-form/text-form.component';
import { ImageFormComponent } from '../components/image-form/image-form.component';
import { TimelineFormComponent } from '../components/timeline-form/timeline-form.component';

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
