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

  reset() {
    const defaultData = new CVData({
      columns: [new Column()]
    })
    this.data.next(defaultData)
  }

  import(importData) {
    const data = new CVData(importData);

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
