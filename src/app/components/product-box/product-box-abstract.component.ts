import { Injectable, Input } from '@angular/core';

import { Product, ProductEnriched } from '../../models/product.model';
import { BasketService } from '../../services/basket.service';
import { Category } from '../../models/category.model';
import { Size } from '../../models/image.model';

@Injectable()
export abstract class ProductBoxAbstractComponent {
  @Input()
  public productEnriched: ProductEnriched;

  @Input()
  public activeCategory: Category;

  public readonly Size = Size;

  public constructor(protected basketService: BasketService) {}

  public addToBasket(product: Product): void {
    this.basketService.add(product);
  }

  public quantityDecrement(id: number): void {
    this.basketService.quantityDecrement(id);
  }

  public quantityIncrement(id: number): void {
    this.basketService.quantityIncrement(id);
  }
}
