import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import { selectProductFeature } from './product.selectors';
import * as fromBasketReducers from '../reducers/basket.reducers';
import * as fromProductReducers from '../reducers/product.reducers';
import { BasketSimpleEntry, BasketEntry } from '../../models/basket.model';

export const selectBasketFeature = (state: State) => state.basket;

export const selectBasketSimpleEntries = createSelector(
  selectBasketFeature,
  (basket: fromBasketReducers.State): BasketSimpleEntry[] =>
    Object.keys(basket).map((key: string): BasketSimpleEntry => basket[+key])
);

export const selectBasketSimpleEntryByProductId = createSelector(
  selectBasketSimpleEntries,
  (basketSimpleEntries: BasketSimpleEntry[], props: { productId: number }) =>
    basketSimpleEntries.find(
      (basketSimpleEntry: BasketSimpleEntry): boolean => basketSimpleEntry.productId === props.productId
    )
);

export const selectBasketEntries = createSelector(
  selectBasketSimpleEntries,
  selectProductFeature,
  (basketSimpleEntries: BasketSimpleEntry[], product: fromProductReducers.State): BasketEntry[] =>
    basketSimpleEntries.map(
      (basketEntry: BasketSimpleEntry): BasketEntry => ({
        ...basketEntry,
        product: product[basketEntry.productId] || null
      })
    )
);
