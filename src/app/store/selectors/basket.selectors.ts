import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import { selectProductsAsKeyValue } from './product.selectors';
import * as fromBasketReducers from '../reducers/basket.reducers';
import { BasketSimpleEntry, BasketEntry } from '../../models/basket.model';
import { Product } from '../../models/product.model';

export const selectBasketFeature = (state: State): fromBasketReducers.State => state.basket;

export const selectBasketSimpleEntries = createSelector(
  selectBasketFeature,
  (basketFeature: fromBasketReducers.State): BasketSimpleEntry[] =>
    Object.keys(basketFeature).map((key: string): BasketSimpleEntry => basketFeature[+key])
);

export const selectBasketSimpleEntryByProductId = createSelector(
  selectBasketSimpleEntries,
  (basketSimpleEntries: BasketSimpleEntry[], props: { productId: number }): BasketSimpleEntry =>
    basketSimpleEntries.find(
      (basketSimpleEntry: BasketSimpleEntry): boolean => basketSimpleEntry.productId === props.productId
    )
);

export const selectBasketEntries = createSelector(
  selectBasketSimpleEntries,
  selectProductsAsKeyValue,
  (basketSimpleEntries: BasketSimpleEntry[], productsAsKeyValue: { [id: number]: Product }): BasketEntry[] =>
    basketSimpleEntries.map(
      (basketEntry: BasketSimpleEntry): BasketEntry => ({
        ...basketEntry,
        product: productsAsKeyValue[basketEntry.productId] || null
      })
    )
);

export const selectQuantityTotal = createSelector(
  selectBasketSimpleEntries,
  (basketSimpleEntries: BasketSimpleEntry[]): number =>
    basketSimpleEntries.reduce((previousValue: number, currentValue: BasketSimpleEntry): number => {
      return previousValue + currentValue.quantity;
    }, 0)
);

export const selectPriceTotal = createSelector(selectBasketEntries, (basketEntries: BasketEntry[]): number =>
  basketEntries.reduce((previousValue: number, currentValue: BasketEntry): number => {
    return previousValue + currentValue.quantity * (currentValue.product ? currentValue.product.price : 0);
  }, 0)
);
