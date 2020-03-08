import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { State } from '../reducers';
import * as fromBasketActions from '../actions/basket.actions';
import * as fromBasketSelectors from '../selectors/basket.selectors';
import { Product } from '../../models/product.model';
import { BasketEntry, BasketSimpleEntry, Type } from '../../models/basket.model';

@Injectable({
  providedIn: 'root'
})
export class BasketFacadeService {
  public isBasketValid$: Observable<boolean>;
  public isOnPotentialOrderRoute$: Observable<boolean>;
  public potentialOrderProductsIds$: Observable<number[]>;
  public quantityTotal$: Observable<number>;

  public constructor(protected store: Store<State>) {
    this.isBasketValid$ = store.pipe(select(fromBasketSelectors.selectIsBasketValid));
    this.isOnPotentialOrderRoute$ = store.pipe(select(fromBasketSelectors.selectIsOnPotentialOrderRoute$));
    this.potentialOrderProductsIds$ = store.pipe(select(fromBasketSelectors.selectPotentialOrderProductsIds));
    this.quantityTotal$ = store.pipe(select(fromBasketSelectors.selectQuantityTotal));
  }

  public add(product: Product, quantity): void {
    this.store.dispatch(fromBasketActions.add({ productId: product.id, quantity }));
  }

  public chooseDelivery(productId: number): void {
    this.store.dispatch(fromBasketActions.chooseDelivery({ productId }));
  }

  public choosePayment(productId: number): void {
    this.store.dispatch(fromBasketActions.choosePayment({ productId }));
  }

  public basketEntriesByType$(types: Type[]): Observable<BasketEntry[]> {
    return this.store.pipe(select(fromBasketSelectors.selectBasketEntries(types)));
  }

  public getBasketSimpleEntryByProductId(productId: number): BasketSimpleEntry {
    let result: BasketSimpleEntry = null;

    this.store
      .pipe(
        select(fromBasketSelectors.selectBasketSimpleEntryByProductId, { productId }),
        take(1),
        tap((basketSimpleEntry: BasketSimpleEntry): void => {
          result = basketSimpleEntry;
        })
      )
      .subscribe();

    return result;
  }

  public priceSum$(types: Type[]): Observable<number> {
    return this.store.pipe(select(fromBasketSelectors.selectPriceSum(types)));
  }

  public quantityDecrement(id: number): void {
    this.store.dispatch(fromBasketActions.quantityDecrement({ id }));
  }

  public quantityIncrement(id: number): void {
    this.store.dispatch(fromBasketActions.quantityIncrement({ id }));
  }

  public quantitySetTo(id: number, quantity: number): void {
    this.store.dispatch(fromBasketActions.quantitySetTo({ id, quantity }));
  }

  public remove(id: number): void {
    this.store.dispatch(fromBasketActions.remove({ id }));
  }
}
