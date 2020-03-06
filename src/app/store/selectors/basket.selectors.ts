import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import { selectProductsAsKeyValue } from './product.selectors';
import * as fromBasketReducers from '../reducers/basket.reducers';
import { BasketSimpleEntry, BasketEntry } from '../../models/basket.model';
import { Product } from '../../models/product.model';

export const selectBasketFeature = (state: State): fromBasketReducers.State => state.basket;

const toBasketEntry = (basketEntry: BasketSimpleEntry, productsAsKeyValue: { [id: number]: Product }): BasketEntry => {
  const product = productsAsKeyValue[basketEntry.productId];

  return {
    ...basketEntry,
    isQuantityDecrementActive: basketEntry.quantity > 1,
    product,
    totalPrice: product ? product.price * basketEntry.quantity : 0
  };
};

export const selectBasketSimpleEntriesAsArray = createSelector(
  selectBasketFeature,
  (basketFeature: fromBasketReducers.State): BasketSimpleEntry[] =>
    Object.keys(basketFeature.list).map((key: string): BasketSimpleEntry => basketFeature.list[key])
);

export const selectBasketSimpleEntriesAsKeyValue = createSelector(
  selectBasketFeature,
  (basketFeature: fromBasketReducers.State): { [id: number]: BasketSimpleEntry } => basketFeature.list
);

export const selectBasketSimpleEntryByProductId = createSelector(
  selectBasketSimpleEntriesAsArray,
  (basketSimpleEntriesAsArray: BasketSimpleEntry[], props: { productId: number }): BasketSimpleEntry =>
    basketSimpleEntriesAsArray.find(
      (basketSimpleEntry: BasketSimpleEntry): boolean => basketSimpleEntry.productId === props.productId
    )
);

export const selectBasketEntries = createSelector(
  selectBasketSimpleEntriesAsArray,
  selectProductsAsKeyValue,
  (basketSimpleEntriesAsArray: BasketSimpleEntry[], productsAsKeyValue: { [id: number]: Product }): BasketEntry[] =>
    basketSimpleEntriesAsArray.map(
      (basketEntry: BasketSimpleEntry): BasketEntry => toBasketEntry(basketEntry, productsAsKeyValue)
    )
);

export const selectQuantityTotal = createSelector(
  selectBasketSimpleEntriesAsArray,
  (basketSimpleEntriesAsArray: BasketSimpleEntry[]): number =>
    basketSimpleEntriesAsArray.reduce((previousValue: number, currentValue: BasketSimpleEntry): number => {
      return previousValue + currentValue.quantity;
    }, 0)
);

export const selectPriceTotal = createSelector(selectBasketEntries, (basketEntries: BasketEntry[]): number =>
  basketEntries.reduce((previousValue: number, currentValue: BasketEntry): number => {
    return previousValue + currentValue.quantity * (currentValue.product ? currentValue.product.price : 0);
  }, 0)
);
