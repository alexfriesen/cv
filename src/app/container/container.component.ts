import { Component, Input, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Text } from '../models/text';
import { Timeline } from '../models/timeline';
import { Container } from '../models/container';
import { ItemType, Item } from '../models/item';
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
    let data;

    switch (options.type) {
      case ItemType.Text:
        data = new Text('New Text');
        break;

      case ItemType.Timeline:
        data = new Timeline('New Timeline');
        break;

      default:
        break;
    }

    this.containerService.addItem(new Item(options.type, data));
  }
}
