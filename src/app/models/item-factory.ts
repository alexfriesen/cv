import { ItemType, Item } from './item';
import { Container } from './container';
import { Image } from './image';
import { Text } from './text';
import { Timeline } from './timeline';

export class ItemFactory {

  static prepare(item: Partial<Item>) {
    let itemData;

    switch (item.type) {

      case ItemType.container:
        itemData = new Container(item.data);
        break;

      case ItemType.image:
        itemData = new Image(item.data);
        break;

      case ItemType.text:
        itemData = new Text(item.data);
        break;

      case ItemType.timeline:
        itemData = new Timeline(item.data);
        break;

      default:
        throw new Error(`unknown ItemType: ${item.type}`);
    }

    return new Item(item.type, itemData);
  }

}
