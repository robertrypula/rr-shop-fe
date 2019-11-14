import { Component, OnInit } from '@angular/core';
import { ProductBoxAbstractComponent } from '../product-box-abstract.component';
import { ProductBoxCompactService } from './product-box-compact.service';

@Component({
  selector: 'rr-shop-product-box-compact',
  templateUrl: './product-box-compact.component.html',
  styleUrls: ['./product-box-compact.component.scss'],
  providers: [ProductBoxCompactService]
})
export class ProductBoxCompactComponent extends ProductBoxAbstractComponent implements OnInit {
  public constructor(productBoxCompactService: ProductBoxCompactService) {
    super(productBoxCompactService);
  }

  public ngOnInit(): void {
    console.log('ProductBoxCompactComponent nginit', this.product.name);
  }
}
