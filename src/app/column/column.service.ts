import { Injectable } from '@angular/core';

import { DataService } from '../data.service';
import { Column, ColumnItem } from '../models/column';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {

  columns: Column[] = []

  constructor(
    private readonly dataService: DataService
  ) {
    this.dataService.data.subscribe(data => {
      this.columns = data.columns
    })
  }

  updateColumn(index: number, column: Column) {
    const data = this.dataService.data.getValue();

    data.columns[index] = column;

    this.dataService.data.next(data);
  }

  addColumn() {
    this.updateColumn(this.columns.length, new Column());
  }

  addColumnItem<T>(index: number, data?: ColumnItem<T>) {
    const column = this.columns[index];

    column.items.push(data || new ColumnItem<Text>());

    this.updateColumn(index, column);
  }
}
