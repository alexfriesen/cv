import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Column } from './models/column';
import { environment } from 'src/environments/environment';

export class CVData {
  columns: Column[]
  constructor(data) {
    this.columns = data.columns || []
  }
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data = new BehaviorSubject<CVData>(null);

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
    const data = this.data.getValue();
    data.columns[data.columns.length] = new Column();
    this.data.next(data);
  }

  reset() {
    const defaultData = new CVData({
      columns: [new Column()]
    });
    this.data.next(defaultData);
  }

  import(importData) {
    const data = new CVData(importData.data);

    this.data.next(data);
  }

  export() {
    const data = this.data.getValue();

    const exportPayload = {
      version: environment.version,
      data,
    };

    return exportPayload;
  }
}
