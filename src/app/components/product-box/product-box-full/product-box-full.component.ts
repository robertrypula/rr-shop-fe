import { Component, OnInit } from '@angular/core';

import { ProductBoxAbstractComponent } from '../product-box-abstract.component';
import { BasketService } from '../../../services/basket.service';

@Component({
  selector: 'rr-shop-product-box-full',
  templateUrl: './product-box-full.component.html',
  styleUrls: ['./product-box-full.component.scss']
})
export class ProductBoxFullComponent extends ProductBoxAbstractComponent implements OnInit {
  public constructor(basketService: BasketService) {
    super(basketService);
  }

  public ngOnInit(): void {
    console.log('ProductBoxFullComponent nginit', this.product.name);
  }
}
