import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Column } from './models/column';

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
}
