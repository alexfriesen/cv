import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TimelineFormComponent } from './form/form.component';

export class Timeline {

  constructor(
    public headline = '',
    public items = []
  ) { }

}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {
  @Input()
  data = new Timeline();

  editingRowIndex = -1;

  constructor(
    private readonly dialog: MatDialog,
  ) { }

  async onAddItem(data = null) {
    if (!data) {
      data = await this.dialog.open(TimelineFormComponent, { data: null }).afterClosed().toPromise();
    }

    this.data.items.push(data);
  }

  async onEditItem(index: number) {
    const data = this.data.items[index];
    const edited = await this.dialog.open(TimelineFormComponent, { data }).afterClosed().toPromise();

    this.setItemData(index, edited);
  }

  setItemData(index: number, data) {
    this.data.items[index] = data;
  }
}
