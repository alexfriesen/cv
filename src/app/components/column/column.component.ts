import { CommonModule } from '@angular/common';
import { Component, Input, HostBinding, inject, OnInit } from '@angular/core';
import { selectEntity, selectMany } from '@ngneat/elf-entities';
import { Observable, switchMap } from 'rxjs';
import { nanoid } from 'nanoid';
import { MaterialModule } from '../../@shared/material.module';
import { ContentComponent } from '../content/content.component';
import { ContentService, DataService } from '../../services';
import { Content, ContentType, Column } from '../../models';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  imports: [CommonModule, MaterialModule, ContentComponent],
  standalone: true,
})
export class ColumnComponent implements OnInit {
  @Input()
  column: Column;

  types = ContentType;
  content$: Observable<Content[]>;

  private readonly contentService = inject(ContentService);
  private readonly dataService = inject(DataService);

  @HostBinding('style.width.%')
  get getWidth() { return this.column.width || 100; }

  ngOnInit() {
    this.content$ = this.dataService.columnStore.pipe(
      selectEntity(this.column.id),
      switchMap((column) => this.dataService.contentStore.pipe(selectMany(column.content)))
    );
  }

  async onAddItem(type: ContentType) {
    const data = await this.contentService.createData(type);

    // if data is falsy the dialog was canceled
    if (data) {
      const content: Content = { id: nanoid(), type, data };

      this.dataService.addContent(this.column, content);
    }

  }
}
