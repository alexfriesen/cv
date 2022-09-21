import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

import { ThemeService } from '../../services';
import { MaterialModule } from '../../@shared/material.module';
import { HeaderComponent } from '../header/header.component';
import { ThemeFormComponent } from '../theme-form/theme-form.component';
import { TemplateDialogComponent } from '../template-dialog/template-dialog.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    MatSidenavModule,

    HeaderComponent,
    ThemeFormComponent,
    TemplateDialogComponent,
  ]
})
export class LayoutComponent implements AfterViewInit {

  sidebarOpen = false;

  private readonly themeService = inject(ThemeService);

  ngAfterViewInit() {
    this.themeService.applyTheme();
  }
}
