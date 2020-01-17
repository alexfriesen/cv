import nanoid from 'nanoid';

import { Item } from './item';

export class Container {
  public id = nanoid();

  public size = 100;
  public alignment = 'column';

  public items: Item[] = [];

  constructor(data?) {
    if (!data) return this;

    if (data.id) {
      this.id = data.id;
    }

    if (data.size) {
      this.size = data.size;
    }

    if (data.alignment) {
      this.alignment = data.alignment;
    }

    if (data.items) {
      this.items = data.items || [];
    }
  }

}
