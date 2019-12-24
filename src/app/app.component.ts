import { Component } from '@angular/core';

import { ColumnService } from './column/column.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  columns = [];

  constructor(
    private readonly columnService: ColumnService
  ) {
    this.columnService.columns.subscribe(data => {
      this.columns = data;
    });
  }

  ngOnInit() {
    if (!this.columnService.columns.value.length) {
      this.columnService.addColumn();
    }
  }

}
