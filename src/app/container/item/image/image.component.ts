import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ImageFormComponent } from './form/form.component';
import { ContainerService } from '../../container.service';
import { DomSanitizer } from '@angular/platform-browser';

import { Image } from 'src/app/models/image';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input()
  rowIndex: number;

  @Input()
  data = new Image();

  get image() {
    if (this.data) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.data.image);
    }
    return null;
  }

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly dialog: MatDialog,
    private readonly containerService: ContainerService,
  ) { }

  async onEdit() {
    const data = this.data;
    const edited = await this.dialog.open(ImageFormComponent, { data }).afterClosed().toPromise();

    if (edited) {
      this.setItemData(edited);
    }
  }

  private setItemData(data) {
    this.containerService.updateItem(this.rowIndex, data);
  }
}
