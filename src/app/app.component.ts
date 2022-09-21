import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, inject } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
// import { ServiceWorkerModule } from '@angular/service-worker';

import { ThemeService } from './services';
import { MaterialModule } from './@shared/material.module';
import { PageComponent } from './components/page/page.component';
import { HeaderComponent } from './components/header/header.component';
import { ThemeFormComponent } from './components/theme-form/theme-form.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { TemplateDialogComponent } from './components/template-dialog/template-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,

    HeaderComponent,
    ThemeFormComponent,
    ConfirmDialogComponent,
    TemplateDialogComponent,

    PageComponent,
    // TextFormComponent,
    // ImageFormComponent,
    // TimelineFormComponent,

    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    //   // Register the ServiceWorker as soon as the app is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // }),
  ]
})
export class AppComponent implements AfterViewInit {

  sidebarOpen = false;

  private readonly themeService = inject(ThemeService);

  ngAfterViewInit() {
    this.themeService.applyTheme();
  }
}
