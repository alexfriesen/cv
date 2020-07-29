export enum ItemType {
  Container = 'container',

  Text = 'text',
  Image = 'image',
  Timeline = 'timeline'
}

export class Item {

  constructor(
    public type: string | ItemType = ItemType.Text,
    public data = null
  ) { }

}
