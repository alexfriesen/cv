export enum ItemType {
  container = 'container',

  text = 'text',
  image = 'image',
  timeline = 'timeline'
};

export class Item {

  constructor(
    public type: string | ItemType = ItemType.text,
    public data = null
  ) { }

}
