import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Image } from '../../models';
import { MaterialModule } from '../../@shared/material.module';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule]
})
export class ImageFormComponent {
  form: FormGroup;

  data: Image = inject(MAT_DIALOG_DATA);
  private readonly sanitizer = inject(DomSanitizer);

  constructor() {
    if (!this.data) {
      this.data = new Image();
    }
    this.form = new FormGroup({
      style: new FormControl<string>(this.data.style),
      image: new FormControl<string>(this.data.image),
    });
  }

  get image() {
    if (this.form.value.image) {
      return this.sanitizer.bypassSecurityTrustUrl(this.form.value.image);
    }
    return null;
  }

  async onUpload(event) {
    const target = event.target as HTMLInputElement;
    if (!target.files || !target.files.length) {
      return alert('Import failed');
    }

    const [file] = event.target.files;

    const content = await this.readFileContent(file);
    this.form.patchValue({
      image: content
    });
  }

  private readFileContent(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onerror = reject;
      fileReader.onabort = reject;

      fileReader.onload = (event: any) => {
        const result = event.target.result;
        resolve(result);
      };

      fileReader.readAsDataURL(file);
    });
  }

}
