import { Injectable, Input } from '@angular/core';

import { ProductEnriched } from '../../models/product.model';
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

  public addToOrder(productEnriched: ProductEnriched): void {
    this.orderService.add(productEnriched);
  }

  public quantityDecrement(orderItemId: number): void {
    this.orderFacadeService.quantityDecrement(orderItemId);
  }

  public quantityIncrement(orderItemId: number): void {
    this.orderFacadeService.quantityIncrement(orderItemId);
  }

  public remove(orderItemId: number): void {
    this.orderService.remove(orderItemId);
  }
}
