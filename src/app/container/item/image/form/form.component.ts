import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Image } from 'src/app/models/image';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-image-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class ImageFormComponent {
  form: FormGroup;

  get image() {
    if (this.form.value.image) {
      return this.sanitizer.bypassSecurityTrustUrl(this.form.value.image);
    }
    return null;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Image,
    private readonly sanitizer: DomSanitizer,
  ) {
    if (!data) {
      data = new Image();
    }
    this.form = new FormGroup({
      style: new FormControl(data.style),
      image: new FormControl(data.image),
    });
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

  private readFileContent(file: File): Promise<any> {
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
