import { Component, Input, HostBinding, OnInit, OnChanges } from '@angular/core';

import { Container } from '../models/container';
import { ItemFactory } from '../models/item-factory';
import { ContainerService } from './container.service';
import { ContainerItemService } from './item/item.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  providers: [ContainerService]
})
export class ContainerComponent implements OnInit, OnChanges {

  @Input()
  rowIndex: number;

  @Input()
  data: Container;

  @HostBinding('class.row') get isRow() { return this.data.alignment === 'row'; }
  @HostBinding('class.column') get isColumn() { return this.data.alignment === 'column'; }
  @HostBinding('style.width') get getWidth() { return `${this.data.size || 100}%`; }

  constructor(
    private readonly containerService: ContainerService,
    private readonly containerItemService: ContainerItemService,
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

  async onAddItem(type: string) {
    const data = await this.containerItemService.edit(new Item(type));
    const item = ItemFactory.prepare({ type, data });

    this.containerService.addItem(item);
  }
}
