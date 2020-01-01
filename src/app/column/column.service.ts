import { Injectable } from '@angular/core';

import { DataService } from '../data.service';
import { Column, ColumnItem } from '../models/column';

@Injectable()
export class ColumnService {

  index: number

  get columns() {
    const data = this.dataService.data.getValue();
    return data.columns || []
  }

  get column() {
    const data = this.dataService.data.getValue();
    return data.columns[this.index]
  }

  constructor(
    private readonly dataService: DataService
  ) { }

  updateColumn(column: Column) {
    const data = this.dataService.data.getValue();

    data.columns[this.index] = column;

    this.dataService.data.next(data);
  }

  addColumnItem<T>(data?: ColumnItem<T>) {
    const column = this.column;

    column.items.push(data || new ColumnItem<Text>());

    this.updateColumn(column);
  }

  updateColumnItem(rowIndex: number, data: any) {
    console.log(this.index, rowIndex, data)
    const column = this.column;
    column.items[rowIndex].data = data;

    console.log(column)

    this.updateColumn(column);
  }
}
