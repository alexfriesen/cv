import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ColumnItemType } from '../../column.service';

@Component({
  selector: 'app-column-item-dialog',
  templateUrl: './dialog.component.html',
  // styleUrls: ['./form.component.scss']
})
export class ColumnItemDialogComponent {
  form = new FormGroup({
    type: new FormControl(ColumnItemType.Text),
  });

  onSave() {

  }

}
