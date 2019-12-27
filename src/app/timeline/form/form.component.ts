import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-timeline-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class TimelineFormComponent {
  form: FormGroup;

  get itemsForm() {
    return this.form.get('items') as FormArray
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (!data) {
      data = {
        headline: '',
        items: [],
      };
    }
    this.form = new FormGroup({
      headline: new FormControl(data.headline),
      items: new FormArray(data.items.map(data => this.createItemForm(data))),
    });
  }

  onAddItem(data?) {
    const item = this.createItemForm(data);
    this.itemsForm.push(item);
  }

  createItemForm(data?) {
    if (!data) {
      data = {
        name: '',
        description: '',
        time: new Date().getFullYear()
      };
    }

    return new FormGroup({
      name: new FormControl(data.name),
      description: new FormControl(data.description),
      time: new FormControl(data.time)
    })
  }

}
