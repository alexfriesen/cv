import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TextFormComponent } from './form/form.component';

export class Text {

  constructor(
    public headline = '',
    public text = ''
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

  editingRowIndex = -1;

  constructor(
    private readonly dialog: MatDialog,
  ) { }


  async onEditHeadline(headline) {
    this.data.headline = headline;
  }

  async onEditText(text) {
    this.data.text = text;
  }
}
