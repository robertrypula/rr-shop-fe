import { Injectable, Input } from '@angular/core';

import { Product, ProductEnriched } from '../../models/product.model';
import { OrderService } from '../../services/order.service';
import { Category } from '../../models/category.model';
import { Size } from '../../models/image.model';

@Injectable()
export abstract class ProductBoxAbstractComponent {
  @Input()
  public productEnriched: ProductEnriched;

  @Input()
  public activeCategory: Category;

  public readonly Size = Size;

  public constructor(protected orderService: OrderService) {}

  public addToOrder(product: Product): void {
    this.orderService.add(product);
  }

  public quantityDecrement(id: number): void {
    this.orderService.quantityDecrement(id);
  }

  public quantityIncrement(id: number): void {
    this.orderService.quantityIncrement(id);
  }
}
