import { Injectable, Input } from '@angular/core';

import { Product } from '../../models/product.model';
import { BasketService } from '../../services/basket.service';
import { Category } from '../../models/category.model';

@Injectable()
export abstract class ProductBoxAbstractComponent {
  @Input()
  public product: Product;

  @Input()
  public activeCategory: Category;

  public constructor(protected basketService: BasketService) {}

  public addToBasket(product: Product): void {
    this.basketService.add(product);
  }
}
