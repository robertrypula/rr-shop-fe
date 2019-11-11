import { Injectable } from '@angular/core';

import { Product } from '../../models/product.model';
import { BasketService } from '../../services/basket.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public constructor(protected basketService: BasketService) {}

  public addToBasket(product: Product): void {
    this.basketService.add(product);
  }
}
