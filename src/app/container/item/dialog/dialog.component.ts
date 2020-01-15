import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ItemType } from 'src/app/models/item';

@Component({
  selector: 'app-container-item-dialog',
  templateUrl: './dialog.component.html',
})
export class ContainerItemDialogComponent {
  form = new FormGroup({
    type: new FormControl(ItemType.Text),
  });
}
