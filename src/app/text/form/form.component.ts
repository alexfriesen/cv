import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-text-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class TextFormComponent {
  editingRowIndex = -1;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (!data) {
      data = {
        name: '',
        description: '',
        time: new Date().getFullYear()
      };
    }
    this.form = new FormGroup({
      name: new FormControl(data.name),
      description: new FormControl(data.description),
      time: new FormControl(data.time)
    });
  }

}
