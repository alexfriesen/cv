import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';

import { DataService } from '../../services';
import { MaterialModule } from '../../@shared/material.module';
import { TemplateDialogComponent } from '../template-dialog/template-dialog.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class HeaderComponent {
  @Input()
  sidebarOpen = false;
  @Output()
  sidebarOpenChange = new EventEmitter<boolean>();

  useStorage: Observable<boolean>;

  private readonly dialog = inject(MatDialog);
  private readonly dataService = inject(DataService);

  constructor() {
    this.useStorage = this.dataService.persistentStorage.asObservable();
  }

  async onUpload(event) {
    const target = event.target as HTMLInputElement;
    if (!target.files || !target.files.length) {
      return alert('Import failed');
    }

    const [file] = event.target.files;

    const content = await this.readFileContent(file);
    this.dataService.import(content);
  }

  onDownload() {
    const content = this.dataService.export();

    const blob = new Blob([JSON.stringify(content)], { type: 'text/plain' });

    saveAs(blob, `cv.json`);
  }

  onPrint() {
    window.print();
  }

  onReset() {
    this.dataService.reset();
  }

  onOpenTemplates() {
    this.dialog.open(TemplateDialogComponent);
  }

  onUseStorageChanged(change: MatSlideToggleChange) {
    if (change.checked) {
      this.dataService.enableStorage();
    } else {
      this.dataService.disableStorage();
    }
  }

  private readFileContent(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onerror = reject;
      fileReader.onabort = reject;

      fileReader.onload = (e: any) => {
        const result = JSON.parse(e.target.result);
        resolve(result);
      };

      fileReader.readAsText(file);
    });
  }

}
