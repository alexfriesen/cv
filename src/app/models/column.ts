export enum ColumnItemType {
  Text = 'text',
  Timeline = 'timeline'
}

export class ColumnItem<T> {
  constructor(
    public type = ColumnItemType.Text,
    public data: T = {} as T
  ) { }
}

export class Column {
  constructor(
    public items = [new ColumnItem()]
  ) { }
}
