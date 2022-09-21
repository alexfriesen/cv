import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

import { MaterialModule } from '../../@shared/material.module';
import { DataService } from '../../services';

@Component({
  selector: 'app-template-dialog',
  templateUrl: './template-dialog.component.html',
  styleUrls: ['./template-dialog.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MaterialModule,
    MatRadioModule,
  ]
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
