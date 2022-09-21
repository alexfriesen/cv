import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, firstValueFrom } from 'rxjs';
import { createStore } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  getAllEntities,
  setEntities,
  updateAllEntities,
  updateEntities,
  withEntities,
} from '@ngneat/elf-entities';

import { VERSION } from '../../environments/version';
import { Theme, Content, Column, defaultTheme } from '../models';
import { ThemeService } from './theme.service';


export class CVData {
  theme: Theme = defaultTheme;
  content: Content[] = [];
  columns: Column[] = [];

  constructor(data?) {
    if (!data) return this;

    this.theme = data.theme || defaultTheme;
    this.content = data.content || [];
    this.columns = data.columns || [];
  }
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  persistentStorage = new BehaviorSubject<boolean>(undefined);

  readonly themeService = inject(ThemeService);

  readonly contentStore = createStore({ name: 'content' }, withEntities<Content>());
  readonly columnStore = createStore({ name: 'columns' }, withEntities<Column>());

  private readonly http = inject(HttpClient);

  constructor() {
    if (this.readDraft()) {
      // if something is already stored, we can assume the privacy consent was checked
      this.persistentStorage.next(true);
    }

    this.restore();

    combineLatest([
      this.themeService.store,
      this.contentStore,
      this.columnStore,
    ]).subscribe(data => {
      this.writeDraft();
    });
  }

  editContent(id: string, data: any) {
    this.contentStore.update(updateEntities(id, { data }));
  }

  addContent(column: Column, content: Content) {
    this.contentStore.update(addEntities(content));
    this.columnStore.update(updateEntities(column.id, { content: [...column.content, content.id] }));
  }

  removeContent(id: string) {
    this.contentStore.update(deleteEntities(id));
    this.columnStore.update(updateAllEntities((column) => ({ ...column, content: column.content.filter(value => value !== id) })));
  }

  setData(data: CVData) {
    this.themeService.updateTheme(data.theme);
    this.contentStore.update(setEntities(data.content));
    this.columnStore.update(setEntities(data.columns));
  }

  getData() {
    return {
      theme: this.themeService.getTheme(),
      content: this.contentStore.query(getAllEntities()),
      columns: this.columnStore.query(getAllEntities()),
    };
  }

  restore() {
    try {
      const draft = this.readDraft();
      if (draft) {
        this.import(draft);
      } else {
        this.importTemplate();
      }
    } catch (error) {
      console.error(error);
      this.importTemplate();
    }
  }

  readDraft() {
    return this.readLocalStorage('draft');
  }

  writeDraft() {
    const data = this.export();
    this.writeLocalStorage('draft', data);
  }

  reset() {
    this.setData(new CVData());
  }

  export() {
    const data = this.getData();

    const exportPayload = {
      version: VERSION.version,
      ...data,
    };

    return exportPayload;
  }

  import(importData) {
    const data = new CVData(importData);

    this.setData(data);
  }

  enableStorage() {
    this.persistentStorage.next(true);
    this.writeDraft();
  }

  disableStorage() {
    this.persistentStorage.next(false);
    this.clearLocalStorage();
  }

  async importTemplate(name = 'simple') {
    const templateData = await firstValueFrom(this.http.get(`assets/templates/${name}.json`));
    this.import(templateData);
  }

  private readLocalStorage(key: string) {
    const rawDraft = localStorage.getItem(key);
    return JSON.parse(rawDraft);
  }

  private writeLocalStorage(key: string, data: any) {
    if (this.persistentStorage.getValue() !== true) return;

    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  }

  private clearLocalStorage() {
    localStorage.clear();
  }
}
