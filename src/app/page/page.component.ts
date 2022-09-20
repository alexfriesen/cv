import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { addEntities, selectAllEntities } from '@ngneat/elf-entities';
import { nanoid } from 'nanoid';
import { DataService } from '../data.service';
import { ColumnComponent } from '../column/column.component';
import { MaterialModule } from '../@shared/material.module';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  imports: [CommonModule, MaterialModule, ColumnComponent],
  standalone: true,
})
export class PageComponent {
  dataService = inject(DataService);
  columns$ = this.dataService.columnStore.pipe(selectAllEntities());

  addColumn() {
    const data = { id: nanoid(), content: [] };
    this.dataService.columnStore.update(addEntities(data));
  }

  trackByFn(item) {
    return item.id;
  }
}
