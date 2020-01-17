import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-timeline-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class TimelineFormComponent {
  form: FormGroup;

  get itemsForm() {
    return this.form.get('items') as FormArray;
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
      items: new FormArray(data.items.map(item => this.createItemForm(item))),
    });

    if (this.itemsForm.length > 1) {
      this.createItemForm();
    }
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
    });
  }

  onRemoveItem(index: number) {
    this.itemsForm.removeAt(index);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    const from = event.previousIndex;
    const to = event.currentIndex;

    const dir = to > from ? 1 : -1;


    const temp = this.itemsForm.at(from);
    for (let i = from; i * dir < to * dir; i = i + dir) {
      const current = this.itemsForm.at(i + dir);
      this.itemsForm.setControl(i, current);
    }
    this.itemsForm.setControl(to, temp);
  }

}
