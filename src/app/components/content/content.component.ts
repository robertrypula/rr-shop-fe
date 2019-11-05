import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'rr-shop-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  public data: any[];
  public image = '01';

  public constructor(protected http: HttpClient) {}

  public onClick(): void {
    this.data = null;
    this.http.get(environment.api + 'product').subscribe((data: any[]) => {
      this.data = data;
    });
  }
}
