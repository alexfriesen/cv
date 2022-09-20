import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-text-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class TextFormComponent {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (!data) {
      data = {
        headline: '',
        description: '',
      };
    }
    this.form = new FormGroup({
      headline: new FormControl<string>(data.headline),
      description: new FormControl<string>(data.description),
    });
  }

}
