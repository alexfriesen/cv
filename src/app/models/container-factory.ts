import { ItemType } from './item';
import { Container } from './container';
import { ItemFactory } from './item-factory';

export class ContainerFactory {

  static prepare(data: Container) {

    if (data.items) {
      data.items = data.items.map(item => {
        if (item.type === ItemType.container) {
          item.data = ContainerFactory.prepare(item.data);
        }
        return ItemFactory.prepare(item);
      });
    }

    return new Container(data);
  }

}
