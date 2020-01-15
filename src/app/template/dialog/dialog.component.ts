import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-template-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class TemplateDialogComponent {

  selection = 'simple';

  constructor(
    private readonly http: HttpClient,
    private readonly dataService: DataService,
  ) { }

  async openTemplate(name: string) {
    const templateData = await this.http.get(`assets/templates/${name}.json`).toPromise();
    this.dataService.import(templateData);
  }

}
