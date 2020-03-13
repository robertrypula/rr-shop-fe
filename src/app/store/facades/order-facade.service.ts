import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { State } from '../reducers';
import * as fromOrderActions from '../actions/order.actions';
import * as fromOrderSelectors from '../selectors/order.selectors';
import { Product } from '../../models/product.model';
import { OrderEntry, OrderSimpleEntry, Type } from '../../models/order.model';
import { selectIsOnOrderRoute, selectUrlOrderUuid } from '../selectors/order.selectors';

@Injectable({
  providedIn: 'root'
})
export class OrderFacadeService {
  public isOrderValid$: Observable<boolean>;
  public isOnOrderRoute$: Observable<boolean> = this.store.pipe(select(selectIsOnOrderRoute));
  public isOnPotentialOrderRoute$: Observable<boolean>;
  public potentialOrderProductsIds$: Observable<number[]>;
  public quantityTotal$: Observable<number>;
  public urlOrderUuid$: Observable<string> = this.store.pipe(select(selectUrlOrderUuid));

  public constructor(protected store: Store<State>) {
    this.isOrderValid$ = store.pipe(select(fromOrderSelectors.selectIsOrderValid));
    this.isOnPotentialOrderRoute$ = store.pipe(select(fromOrderSelectors.selectIsOnPotentialOrderRoute$));
    this.potentialOrderProductsIds$ = store.pipe(select(fromOrderSelectors.selectPotentialOrderProductsIds));
    this.quantityTotal$ = store.pipe(select(fromOrderSelectors.selectQuantityTotal));
  }

  public add(product: Product, quantity): void {
    this.store.dispatch(fromOrderActions.add({ productId: product.id, quantity }));
  }

  public orderEntriesByType$(types: Type[]): Observable<OrderEntry[]> {
    return this.store.pipe(select(fromOrderSelectors.selectOrderEntries(types)));
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

  public getOrderSimpleEntryByProductId(productId: number): OrderSimpleEntry {
    let result: OrderSimpleEntry = null;

    this.store
      .pipe(
        select(fromOrderSelectors.selectOrderSimpleEntryByProductId, { productId }),
        take(1),
        tap((orderSimpleEntry: OrderSimpleEntry): void => {
          result = orderSimpleEntry;
        })
      )
      .subscribe();

    return result;
  }

  public priceSum$(types: Type[]): Observable<number> {
    return this.store.pipe(select(fromOrderSelectors.selectPriceSum(types)));
  }

  public quantityDecrement(id: number): void {
    this.store.dispatch(fromOrderActions.quantityDecrement({ id }));
  }

  public quantityIncrement(id: number): void {
    this.store.dispatch(fromOrderActions.quantityIncrement({ id }));
  }

  public quantitySetTo(id: number, quantity: number): void {
    this.store.dispatch(fromOrderActions.quantitySetTo({ id, quantity }));
  }

  public remove(id: number): void {
    this.store.dispatch(fromOrderActions.remove({ id }));
  }
}
