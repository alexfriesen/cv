import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Timeline } from '../timeline/timeline.component';

export enum ColumnItemType {
  Text = 'text',
  Timeline = 'timeline'
}

export class ColumnItem {
  constructor(
    public type = ColumnItemType.Timeline,
    public data = new Timeline()
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

  addColumnItem(columnIndex: number, data?: ColumnItem) {
    const columns = this.columns.getValue();

    columns[columnIndex].items.push(data || new ColumnItem());

    this.columns.next(columns);
  }
}
