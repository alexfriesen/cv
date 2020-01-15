import { Injectable } from '@angular/core';

import { DataService } from '../data.service';
import { Container } from '../models/container';
import { ItemType, Item } from '../models/item';

function findContainerById(source: Container, id: string) {
  if (source.id === id) {
    return source;
  }

  for (const item of source.items) {
    if (item.data.id === id) {
      return item.data;
    }

    if (item.type === ItemType.Container) {
      const result = findContainerById(item.data, id);
      if (result) {
        return result;
      }
    }
  }
}

function findAndUpdate(source: Container, id: string, data: Container) {
  if (source.id === id) {

    Object.assign(source, data);

  } else {

    source.items.forEach(item => {
      if (item.type === ItemType.Container) {

        if (item.data.id === id) {
          item.data = data;
        } else {
          findAndUpdate(item.data, id, data);
        }

      }
    });

  }
}

@Injectable()
export class ContainerService {

  currentId: string;

  get items() {
    const data = this.container;
    return data.items;
  }

  get container() {
    const data = this.dataService.getData();
    return findContainerById(data.container, this.currentId);
  }

  constructor(
    private readonly dataService: DataService
  ) { }

  update(container: Container) {
    const data = this.dataService.getData();

    findAndUpdate(data.container, this.currentId, container);

    this.dataService.setData(data);
  }

  addContainer(newContainer?: Container) {
    this.addItem(new Item(ItemType.Container, new Container(newContainer)));
  }

  addItem(data: Item) {
    const container = this.container;

    container.items.push(data);

    this.update(container);
  }

  updateItem(rowIndex: number, data: Item) {
    const container = this.container;
    container.items[rowIndex].data = data;

    this.update(container);
  }
}
