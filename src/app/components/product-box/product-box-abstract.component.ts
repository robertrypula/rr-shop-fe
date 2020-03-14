import { Injectable, Input } from '@angular/core';

import { Product, ProductEnriched } from '../../models/product.model';
import { OrderService } from '../../services/order.service';
import { CategoryStore } from '../../models/category.model';
import { Size } from '../../models/image.model';
import { OrderFacadeService } from '../../store/facades/order-facade.service';

@Injectable()
export abstract class ProductBoxAbstractComponent {
  @Input()
  public productEnriched: ProductEnriched;

  @Input()
  public activeCategory: CategoryStore;

  public readonly Size = Size;

  public constructor(protected orderService: OrderService, protected orderFacadeService: OrderFacadeService) {}

  public addToOrder(product: Product): void {
    this.orderService.add(product);
  }

  public quantityDecrement(id: number): void {
    this.orderFacadeService.quantityDecrement(id);
  }

  public quantityIncrement(id: number): void {
    this.orderFacadeService.quantityIncrement(id);
  }
}
