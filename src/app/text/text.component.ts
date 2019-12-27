import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TextFormComponent } from './form/form.component';

export class Text {

  constructor(
    public headline = '',
    public description = ''
  ) { }

}

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  @Input()
  data = new Text();

  constructor(
    private readonly dialog: MatDialog,
  ) { }


  async onEdit(index: number) {
    const data = this.data;
    const edited = await this.dialog.open(TextFormComponent, { data }).afterClosed().toPromise();

    this.setItemData(index, edited);
  }

  setItemData(index: number, data) {
    this.data = data;
  }
}
