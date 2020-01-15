import nanoid from 'nanoid';

import { Item, ItemType } from './item';

export class Container {
  public id = nanoid();

  public alignment = 'column';
  public size = 100;

  public items: Item[] = [];

  constructor(data?) {
    if (data) {
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
        this.items = data.items.map(item => {
          switch (item.type) {
            case ItemType.Container:
              return new Item(item.type, new Container(item.data));

            default:
              return new Item(item.type, item.data);
          }
        });
      }
    }
  }


}
