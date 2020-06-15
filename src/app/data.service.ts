import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { VERSION } from 'src/environments/version';
import { Theme } from './models/theme';
import { Container } from './models/container';
import { ContainerFactory } from './models/container-factory';

export class CVData {

  theme = new Theme();
  container = new Container();

  constructor(data?) {
    if (!data) return this;

    this.theme = new Theme(data.theme);
    this.container = ContainerFactory.prepare(data.container);
  }

}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data = new BehaviorSubject<CVData>(new CVData());

  constructor(
    private readonly http: HttpClient,
  ) {
    this.restore()
  }

  setData(data: CVData) {
    this.data.next(data);
  }

  getData() {
    return this.data.getValue();
  }

  restore() {
    try {
      const draft = this.readDraft();
      this.import(draft);
    } catch (error) {
      this.importTemplate();
    }
  }

  readDraft() {
    const rawDraft = localStorage.getItem('draft');
    return JSON.parse(rawDraft);
  }

  writeDraft() {
    const data = this.export();
    const serializedData = JSON.stringify(data);

    localStorage.setItem('draft', serializedData);
  }

  reset() {
    this.setData(new CVData());
  }

  export() {
    const data = this.getData();

    const exportPayload = {
      version: VERSION.version,
      data,
    };

    return exportPayload;
  }

  import(importData) {
    const data = new CVData(importData.data);

    this.setData(data);
  }

  async importTemplate(name = 'simple') {
    const templateData = await this.http.get(`assets/templates/${name}.json`).toPromise();
    this.import(templateData);
  }
}
