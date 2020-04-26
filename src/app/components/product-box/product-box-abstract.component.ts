import { Injectable, Input } from '@angular/core';

import { CategoryStore } from '../../models/category.model';
import { SizeImage, SizeImageContainer } from '../../models/image.model';
import { OrderFacadeService } from '../../store/facades/order-facade.service';
import { OrderService } from '../../services/order.service';
import { Product } from '../../models/product.model';

@Injectable()
export abstract class ProductBoxAbstractComponent {
  @Input()
  public product: Product;

  @Input()
  public activeCategory: CategoryStore;

  public readonly SizeImage = SizeImage;
  public readonly SizeImageContainer = SizeImageContainer;

  public constructor(protected orderService: OrderService, protected orderFacadeService: OrderFacadeService) {}

  public addToOrder(product: Product): void {
    this.orderService.add(product);
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
