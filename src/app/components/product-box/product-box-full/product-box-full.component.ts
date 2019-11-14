import { Component } from '@angular/core';

import { ProductBoxFullService } from './product-box-full.service';
import { ProductBoxAbstractComponent } from '../product-box-abstract.component';

@Component({
  selector: 'rr-shop-product-box-full',
  templateUrl: './product-box-full.component.html',
  styleUrls: ['./product-box-full.component.scss'],
  providers: [ProductBoxFullService]
})
export class ProductBoxFullComponent extends ProductBoxAbstractComponent {
  public constructor(productBoxFullService: ProductBoxFullService) {
    super(productBoxFullService);
  }
}
