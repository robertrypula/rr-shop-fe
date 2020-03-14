import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../reducers';
import * as fromOrderActions from '../actions/order.actions';
import * as fromOrderSelectors from '../selectors/order.selectors';
import { Product } from '../../models/product.model';
import { Order, OrderItem, Type } from '../../models/order.model';
import { selectIsOnOrderRoute, selectUrlOrderUuid } from '../selectors/order.selectors';

@Injectable({
  providedIn: 'root'
})
export class OrderFacadeService {
  public isOnOrderRoute$: Observable<boolean> = this.store.pipe(select(selectIsOnOrderRoute));
  public isOnPotentialOrderRoute$: Observable<boolean> = this.store.pipe(
    select(fromOrderSelectors.selectIsOnPotentialOrderRoute$)
  );
  public potentialOrderProductsIds$: Observable<number[]> = this.store.pipe(
    select(fromOrderSelectors.selectPotentialOrderProductsIds)
  );
  public urlOrderUuid$: Observable<string> = this.store.pipe(select(selectUrlOrderUuid));

  public constructor(protected store: Store<State>) {}

  public add(product: Product): void {
    this.store.dispatch(fromOrderActions.add({ productId: product.id }));
  }

  public orderItemsByType$(types: Type[]): Observable<OrderItem[]> {
    return this.store.pipe(select(fromOrderSelectors.selectOrderItems(types)));
  }

  public chooseDelivery(productId: number): void {
    this.store.dispatch(fromOrderActions.chooseDelivery({ productId }));
  }

  public choosePayment(productId: number): void {
    this.store.dispatch(fromOrderActions.choosePayment({ productId }));
  }

  public createOrder(): void {
    this.store.dispatch(fromOrderActions.createOrderRequest());
  }

  public orderByUuid$(uuid: string): Observable<Order> {
    return this.store.pipe(select(fromOrderSelectors.selectOrderByUuid(uuid)));
  }

  public quantityDecrement(id: number): void {
    this.store.dispatch(fromOrderActions.quantityDecrement({ id }));
  }

  public quantityIncrement(id: number): void {
    this.store.dispatch(fromOrderActions.quantityIncrement({ id }));
  }

  public remove(id: number): void {
    this.store.dispatch(fromOrderActions.remove({ id }));
  }
}
