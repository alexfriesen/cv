import nanoid from 'nanoid';

export enum ItemType {
  Container = 'container',

  Text = 'text',
  Image = 'image',
  Timeline = 'timeline'
}

export class Item {
  // id = nanoid();

  constructor(
    public type = ItemType.Text,
    public data = null
  ) { }

}
