import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ColumnItemType } from 'src/app/models/column';

@Component({
  selector: 'app-column-item-dialog',
  templateUrl: './dialog.component.html',
})
export class ColumnItemDialogComponent {
  form = new FormGroup({
    type: new FormControl(ColumnItemType.Text),
  });
}
