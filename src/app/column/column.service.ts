import { Injectable } from '@angular/core';

import { DataService } from '../data.service';
import { Column, ColumnItem } from '../models/column';

@Injectable()
export class ColumnService {

  index: number;

  get columns() {
    const data = this.dataService.getData();
    return data.columns || [];
  }

  get column() {
    const data = this.dataService.getData();
    return data.columns[this.index];
  }

  constructor(
    private readonly dataService: DataService
  ) { }

  updateColumn(column: Column) {
    const data = this.dataService.getData();

    data.columns[this.index] = column;

    this.dataService.setData(data);
  }

  addColumnItem<T>(data?: ColumnItem<T>) {
    const column = this.column;

    column.items.push(data || new ColumnItem<Text>());

    this.updateColumn(column);
  }

  updateColumnItem(rowIndex: number, data: any) {
    const column = this.column;
    column.items[rowIndex].data = data;

    this.updateColumn(column);
  }
}
