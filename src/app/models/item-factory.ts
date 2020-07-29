import { ItemType, Item } from './item';
import { Container } from './container';
import { Image } from './image';
import { Text } from './text';
import { Timeline } from './timeline';

export class ItemFactory {

  static prepare(item: Partial<Item>) {
    let itemData;

    switch (item.type) {

      case ItemType.Container:
        itemData = new Container(item.data);
        break;

      case ItemType.Image:
        itemData = new Image(item.data);
        break;

      case ItemType.Text:
        itemData = new Text(item.data);
        break;

      case ItemType.Timeline:
        itemData = new Timeline(item.data);
        break;

      default:
        throw new Error(`unknown ItemType: ${item.type}`);
    }

    return new Item(item.type, itemData);
  }

}
