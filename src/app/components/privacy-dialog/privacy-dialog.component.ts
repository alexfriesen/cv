import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../@shared/material.module';

@Component({
  selector: 'app-privacy-dialog',
  templateUrl: 'privacy-dialog.component.html',
  standalone: true,
  imports: [CommonModule, MaterialModule],
})
export class PrivacyDialogComponent { }
