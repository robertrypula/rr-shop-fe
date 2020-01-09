import { Component, OnInit } from '@angular/core';

import { ProductBoxAbstractComponent } from '../product-box-abstract.component';
import { BasketService } from '../../../services/basket.service';

@Component({
  selector: 'rr-shop-product-box-compact',
  templateUrl: './product-box-compact.component.html',
  styleUrls: ['./product-box-compact.component.scss']
})
export class ProductBoxCompactComponent extends ProductBoxAbstractComponent implements OnInit {
  public constructor(basketService: BasketService) {
    super(basketService);
  }

  public ngOnInit(): void {
    console.log('ProductBoxCompactComponent nginit', this.product.name);
  }
}
