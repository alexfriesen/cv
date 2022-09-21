import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MaterialModule } from '../../@shared/material.module';

@Component({
  selector: 'app-timeline-form',
  templateUrl: './timeline-form.component.html',
  styleUrls: ['./timeline-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
})
export class TimelineFormComponent {
  form: FormGroup;

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
      headline: new FormControl<string>(data.headline),
      items: new FormArray(data.items.map(item => this.createItemForm(item))),
    });

    if (this.itemsForm.length > 1) {
      this.createItemForm();
    }
  }

  get itemsForm() {
    return this.form.get('items') as FormArray;
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
      name: new FormControl<string>(data.name),
      description: new FormControl<string>(data.description),
      time: new FormControl<string>(data.time),
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
