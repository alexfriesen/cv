import { Injectable } from '@angular/core';

import { DataService } from '../data.service';
import { Container } from '../models/container';
import { ItemType, Item } from '../models/item';

const findContainerById = (source: Container, id: string): Container => {
  if (source.id === id) {
    return source;
  }

  for (const item of source.items) {
    if (item.data.id === id) {
      return item.data;
    }

    if (item.type === ItemType.container) {
      const result = findContainerById(item.data, id);
      if (result) {
        return result;
      }
    }
  }
};

const findAndUpdate = (source: Container, id: string, data: Container) => {
  if (source.id === id) {

    Object.assign(source, data);

  } else {

    source.items.forEach(item => {
      if (item.type === ItemType.container) {

        if (item.data.id === id) {
          item.data = data;
        } else {
          findAndUpdate(item.data, id, data);
        }

      }
    });

  }
};

const findAndRemove = (source: Container, id: string) => {

  source.items = source.items.filter(item => {
    if (item.type === ItemType.container) {
      return item.data.id !== id;
    }

    return true;
  });

  source.items.forEach(item => {
    if (item.type === ItemType.container) {
      findAndRemove(item.data, id);
      cleanup(item.data);
    }
  });

  cleanup(source);

};

const cleanup = (source: Container) => {
  source.items = source.items.filter(item => {
    if (item.type === ItemType.container && !item.data.items.length) {
      return false;
    }

    return true;
  });
};

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

  remove() {
    const data = this.dataService.getData();

    findAndRemove(data.container, this.currentId);

    this.dataService.setData(data);
  }

  addContainer(newContainer?: Container) {
    this.addItem(new Item(ItemType.container, new Container(newContainer)));
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

  removeItem(rowIndex: number) {
    const container = this.container;
    container.items = container.items.filter((item, index) => rowIndex !== index);

    if (container.items.length > 0) {
      this.update(container);
    } else {
      this.remove();
    }

  }
}
