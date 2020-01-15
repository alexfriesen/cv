import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Container } from './models/container';
import { Theme } from './models/theme';

export class CVData {

  theme = new Theme();
  container = new Container();

  constructor(data?) {
    if (data) {
      this.theme = new Theme(data.theme);
      this.container = new Container(data.container);
    }
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

  reset() {
    this.setData(new CVData());
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
