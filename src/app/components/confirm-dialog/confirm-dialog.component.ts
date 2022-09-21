import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../@shared/material.module';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: 'confirm-dialog.component.html',
  standalone: true,
  imports: [CommonModule, MaterialModule],
})
export class ConfirmDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { icon?: string; title: string; text: string }
  ) { }

}
