import { Input } from '@angular/core';

import { Product } from '../../models/product.model';
import { ProductBoxAbstractService } from './product-box-abstract.service';

export abstract class ProductBoxAbstractComponent {
  @Input()
  public product: Product;

  protected constructor(protected productBoxAbstractService: ProductBoxAbstractService) {}

  public addToBasket(product: Product): void {
    this.productBoxAbstractService.addToBasket(product);
  }
}
