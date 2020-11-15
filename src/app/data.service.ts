import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

import { VERSION } from 'src/environments/version';
import { Theme } from './models/theme';
import { Container } from './models/container';
import { ContainerFactory } from './models/container-factory';
import { PrivacyDialogComponent } from './@shared/privacy-dialog/privacy-dialog.component';

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
  persistentStorage = new BehaviorSubject<boolean>(undefined);
  data = new BehaviorSubject<CVData>(new CVData());

  constructor(
    private readonly dialog: MatDialog,
    private readonly http: HttpClient,
  ) {
    if (this.readDraft()) {
      // if something is already stored, we can assume the privacy consent was checked
      this.persistentStorage.next(true);
    }

    this.restore();
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
      data,
    };

    return exportPayload;
  }

  import(importData) {
    const data = new CVData(importData.data);

    this.setData(data);
  }

  enableStorage() {
    this.persistentStorage.next(undefined);
    this.dialog.open(PrivacyDialogComponent)
      .afterClosed()
      .subscribe(result => {
        if (result === true) {
          this.persistentStorage.next(true);
          this.writeDraft();
        } else {
          this.persistentStorage.next(false);
        }
      });
  }

  disableStorage() {
    this.persistentStorage.next(false);
    this.clearLocalStorage();
  }

  async importTemplate(name = 'simple') {
    const templateData = await this.http.get(`assets/templates/${name}.json`).toPromise();
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
