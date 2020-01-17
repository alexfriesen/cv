import { Component } from '@angular/core';

import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-template-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class TemplateDialogComponent {

  selection = 'simple';

  constructor(
    private readonly dataService: DataService,
  ) { }

  async openTemplate(name: string) {
    this.dataService.importTemplate(name);
  }

}
