import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import { selectProductFeature } from './product.selectors';
import * as fromBasketReducers from '../reducers/basket.reducers';
import * as fromProductReducers from '../reducers/product.reducers';
import { BasketSimpleEntry, BasketEntry } from '../../models/basket.model';

export const selectBasketFeature = (state: State) => state.basket;

export const selectBasketEntries = createSelector(
  selectBasketFeature,
  selectProductFeature,
  (basket: fromBasketReducers.State, product: fromProductReducers.State): BasketEntry[] => {
    return Object.keys(basket)
      .map((key: string): BasketSimpleEntry => basket[+key])
      .map(
        (basketEntry: BasketSimpleEntry): BasketEntry => ({
          ...basketEntry,
          product: product[basketEntry.productId] || null
        })
      );
  }
);
