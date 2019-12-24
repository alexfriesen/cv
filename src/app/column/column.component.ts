import { Component, Input } from '@angular/core';
import { ColumnService, Column } from './column.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
  @Input()
  data: Column;

  @Input()
  index;

  constructor(
    private readonly columnService: ColumnService
  ) { }

  onAddRow() {
    this.columnService.addColumnItem(this.index);
  }
}
