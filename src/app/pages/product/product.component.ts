import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'rr-shop-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public data: any[]; // 'any' because it's still just a test...
  public image = '01';

  public constructor(protected http: HttpClient) {}

  public ngOnInit(): void {}

  public onClick(): void {
    this.data = null;
    this.http.get(environment.urlApi + 'product').subscribe((data: any[]) => {
      this.data = data;
    });
  }
}
