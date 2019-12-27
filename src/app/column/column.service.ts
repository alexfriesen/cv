import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class ColumnService {
  columns = new BehaviorSubject<Column[]>([]);

  addColumn() {
    const columns = this.columns.getValue();

    this.columns.next([...columns, new Column()]);
  }

  addColumnItem<T>(columnIndex: number, data?: ColumnItem<T>) {
    const columns = this.columns.getValue();

    columns[columnIndex].items.push(data || new ColumnItem<Text>());

    this.columns.next(columns);
  }
}
