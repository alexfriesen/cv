export enum ItemType {
  Container = 'container',

  Text = 'text',
  Image = 'image',
  Timeline = 'timeline'
}

export class Item {

  constructor(
    public type = ItemType.Text,
    public data = null
  ) { }

}
