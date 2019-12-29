import { Component } from '@angular/core';

import { DataService, CVData } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  data: CVData;

  constructor(
    private readonly dataService: DataService
  ) {
    this.dataService.data.subscribe(data => {
      this.data = data;
    });
  }

  ngOnInit() {
    this.dataService.reset()
  }

}
