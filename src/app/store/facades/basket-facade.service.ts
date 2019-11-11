import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from '../reducers';
import * as fromActions from '../actions/basket.actions';
import * as fromSelectors from '../selectors/basket.selectors';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class BasketFacadeService {
  public constructor(protected store: Store<State>) {}

  public add(product: Product, quantity): void {
    this.store.dispatch(fromActions.add({ id: product.id, quantity }));
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
