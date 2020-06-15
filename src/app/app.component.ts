import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { saveAs } from 'file-saver';

import { DataService, CVData } from './data.service';
import { ThemeService } from './theme/theme.service';
import { TemplateDialogComponent } from './template/dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  data: CVData;

  sidebarOpen = false;

  constructor(
    private readonly dialog: MatDialog,
    private readonly dataService: DataService,
    private readonly themeService: ThemeService,
  ) {
    this.dataService.data.subscribe(data => {
      this.data = data;
      this.dataService.writeDraft();
    });
  }

  ngAfterViewInit() {
    this.themeService.applyTheme();
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
