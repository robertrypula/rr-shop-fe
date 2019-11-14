import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { State } from '../reducers';
import * as fromActions from '../actions/basket.actions';
import * as fromSelectors from '../selectors/basket.selectors';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';
import { BasketEntry, BasketSimpleEntry } from '../../models/basket.model';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasketFacadeService {
  public basketEntries$: Observable<BasketEntry[]>;
  public priceTotal$: Observable<number>;
  public quantityTotal$: Observable<number>;

  public constructor(protected store: Store<State>) {
    this.basketEntries$ = store.pipe(select(fromSelectors.selectBasketEntries));
    this.priceTotal$ = store.pipe(select(fromSelectors.selectPriceTotal));
    this.quantityTotal$ = store.pipe(select(fromSelectors.selectQuantityTotal));
  }

  public add(product: Product, quantity): void {
    this.store.dispatch(fromActions.add({ id: product.id, quantity }));
  }

  public getBasketSimpleEntryByProductId(productId: number): Observable<BasketSimpleEntry> {
    return this.store.pipe(
      select(fromSelectors.selectBasketSimpleEntryByProductId, { productId }),
      take(1)
    );
  }

  public quantityDecrement(id: number): void {
    this.store.dispatch(fromActions.quantityDecrement({ id }));
  }

  public quantityIncrement(id: number): void {
    this.store.dispatch(fromActions.quantityIncrement({ id }));
  }

  public quantitySetTo(id: number, quantity: number): void {
    this.store.dispatch(fromActions.quantitySetTo({ id, quantity }));
  }

  public remove(id: number): void {
    this.store.dispatch(fromActions.remove({ id }));
  }
}
