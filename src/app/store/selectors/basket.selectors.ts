import { createSelector } from '@ngrx/store';

import { BasketEntry, BasketSimpleEntry } from '../../models/basket.model';
import { Product } from '../../models/product.model';
import { selectProductsAsKeyValue } from './product-core.selectors';
import { selectBasketSimpleEntriesAsArray } from './basket-core.selectors';

const toBasketEntry = (
  basketSimpleEntry: BasketSimpleEntry,
  productsAsKeyValue: { [id: number]: Product }
): BasketEntry => {
  const product = productsAsKeyValue[basketSimpleEntry.productId];

  return {
    ...basketSimpleEntry,
    isQuantityDecrementActive: basketSimpleEntry.quantity > 1,
    product,
    totalPrice: product ? product.price * basketSimpleEntry.quantity : 0
  };
};

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
      (basketSimpleEntry: BasketSimpleEntry): BasketEntry => toBasketEntry(basketSimpleEntry, productsAsKeyValue)
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
