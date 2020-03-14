import { Injectable } from '@angular/core';

import { BarService } from './bar.service';
import { Product } from '../models/product.model';
import { OrderFacadeService } from '../store/facades/order-facade.service';
import { OrderItemStore } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // TODO migrate everything to facade and remove service
  public constructor(protected barService: BarService, protected orderFacadeService: OrderFacadeService) {}

  public add(product: Product, quantity = 1): void {
    const orderItemStore: OrderItemStore = this.orderFacadeService.getOrderItemStoreByProductId(product.id);

    if (orderItemStore) {
      this.orderFacadeService.quantitySetTo(orderItemStore.id, orderItemStore.quantity + quantity);
    } else {
      this.orderFacadeService.add(product, quantity);
    }
    this.barService.showSuccess(`Produkt '${product.name}' dodany do koszyka`); // TODO translations
  }

  public remove(id: number): void {
    this.orderFacadeService.remove(id);
    this.barService.showSuccess(`Produkt usunięty z koszyka`); // TODO translations
  }
}
