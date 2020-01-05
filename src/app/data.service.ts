import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Column } from './models/column';
import { Theme } from './models/theme';

export class CVData {

  columns: Column[];
  theme: Theme;

  constructor(data) {
    this.columns = data.columns || [];
    this.theme = new Theme(data.theme);
  }

}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data = new BehaviorSubject<CVData>(null);

  setData(data: CVData) {
    this.data.next(data);
  }

  getData() {
    return this.data.getValue();
  }

  restore() {
    try {
      const draft = this.getDraft();
      this.import(draft);
    } catch (error) {
      this.reset();
    }
  }

  getDraft() {
    const rawDraft = localStorage.getItem('draft');
    return JSON.parse(rawDraft);
  }

  saveDraft() {
    const data = this.export();
    const serializedData = JSON.stringify(data);

    localStorage.setItem('draft', serializedData);
  }

  addColumn() {
    const data = this.getData();
    data.columns[data.columns.length] = new Column();
    this.setData(data);
  }

  reset() {
    const defaultData = new CVData({
      columns: [new Column()]
    });
    this.setData(defaultData);
  }

  import(importData) {
    const data = new CVData(importData.data);

    this.setData(data);
  }

  export() {
    const data = this.getData();

    const exportPayload = {
      version: environment.version,
      data,
    };

    return exportPayload;
  }
}
