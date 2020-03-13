import { Injectable } from '@angular/core';
import { BarService } from './bar.service';
import { Product } from '../models/product.model';
import { OrderFacadeService } from '../store/facades/order-facade.service';
import { Observable } from 'rxjs';
import { OrderEntry, OrderSimpleEntry, Type } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public isOrderValid$: Observable<boolean>;
  public potentialOrderProductsIds$: Observable<number[]>;
  public quantityTotal$: Observable<number>;

  public constructor(protected barService: BarService, protected orderFacadeService: OrderFacadeService) {
    this.isOrderValid$ = orderFacadeService.isOrderValid$;
    this.potentialOrderProductsIds$ = orderFacadeService.potentialOrderProductsIds$;
    this.quantityTotal$ = orderFacadeService.quantityTotal$;
  }

  public add(product: Product, quantity = 1): void {
    const orderSimpleEntry: OrderSimpleEntry = this.orderFacadeService.getOrderSimpleEntryByProductId(product.id);

    if (orderSimpleEntry) {
      this.orderFacadeService.quantitySetTo(orderSimpleEntry.id, orderSimpleEntry.quantity + quantity);
    } else {
      this.orderFacadeService.add(product, quantity);
    }
    this.barService.showSuccess(`Produkt '${product.name}' dodany do koszyka`); // TODO translations
  }

  public chooseDelivery(productId: number): void {
    this.orderFacadeService.chooseDelivery(productId);
  }

  public choosePayment(productId: number): void {
    this.orderFacadeService.choosePayment(productId);
  }

  public orderEntriesByType$(types: Type[]): Observable<OrderEntry[]> {
    return this.orderFacadeService.orderEntriesByType$(types);
  }

  public priceSum$(types: Type[]): Observable<number> {
    return this.orderFacadeService.priceSum$(types);
  }

  public quantityDecrement(id: number): void {
    this.orderFacadeService.quantityDecrement(id);
  }

  public quantityIncrement(id: number): void {
    this.orderFacadeService.quantityIncrement(id);
  }

  public quantitySetTo(id: number, quantity: number): void {
    this.orderFacadeService.quantitySetTo(id, quantity);
  }

  public remove(id: number): void {
    this.orderFacadeService.remove(id);
    this.barService.showSuccess(`Produkt usunięty z koszyka`); // TODO translations
  }
}
