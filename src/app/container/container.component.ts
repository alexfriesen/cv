import { Component, Input, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Container } from '../models/container';
import { ItemFactory } from '../models/item-factory';
import { ContainerService } from './container.service';
import { ContainerItemDialogComponent } from './item/dialog/dialog.component';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  providers: [ContainerService]
})
export class ContainerComponent {

  @Input()
  rowIndex: number;

  @Input()
  data: Container;

  @HostBinding('class.row') get isRow() { return this.data.alignment === 'row'; }
  @HostBinding('class.column') get isColumn() { return this.data.alignment === 'column'; }
  @HostBinding('style.width') get getWidth() { return `${this.data.size || 100}%`; }

  constructor(
    private readonly dialog: MatDialog,
    private readonly containerService: ContainerService
  ) { }

  ngOnInit() {
    this.containerService.currentId = this.data.id;
  }

  ngOnChanges() {
    this.containerService.currentId = this.data.id;
  }

  async onAddRow() {
    const options = { alignment: 'row' };
    this.containerService.addContainer(new Container(options));
  }

  async onAddColumn() {
    const options = { alignment: 'column' };
    this.containerService.addContainer(new Container(options));
  }

  async onAddItem() {
    const options = await this.dialog.open(ContainerItemDialogComponent).afterClosed().toPromise();

    if (options) {
      const item = ItemFactory.prepare(options);
      this.containerService.addItem(item);
    }
  }
}
