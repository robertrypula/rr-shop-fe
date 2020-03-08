import { createSelector } from '@ngrx/store';

import { BasketEntry, BasketSimpleEntry, Type } from '../../models/basket.model';
import { Product, ProductEnriched } from '../../models/product.model';
import { selectProductsAsKeyValue } from './product-core.selectors';
import { selectBasketSimpleEntriesAsArray } from './basket-core.selectors';
import { toBasketEntry } from './basket.utils';
import { selectProductsEnrichedFromCategoryByStructuralNode } from './product.selectors';
import { StructuralNode } from '../../models/category.model';
import { selectUrl } from './router.selectors';
import { isOnPotentialRoute } from '../../utils/routing.util';

export const selectBasketEntries = (types: Type[] = [Type.Normal]) =>
  createSelector(
    selectBasketSimpleEntriesAsArray,
    selectProductsAsKeyValue,
    (basketSimpleEntriesAsArray: BasketSimpleEntry[], productsAsKeyValue: { [id: number]: Product }): BasketEntry[] =>
      basketSimpleEntriesAsArray
        .filter((basketSimpleEntry: BasketSimpleEntry): boolean => types.includes(basketSimpleEntry.type))
        .map(
          (basketSimpleEntry: BasketSimpleEntry): BasketEntry => toBasketEntry(basketSimpleEntry, productsAsKeyValue)
        )
  );

export const selectBasketSimpleEntryByProductId = createSelector(
  selectBasketSimpleEntriesAsArray,
  (basketSimpleEntriesAsArray: BasketSimpleEntry[], props: { productId: number }): BasketSimpleEntry =>
    basketSimpleEntriesAsArray.find(
      (basketSimpleEntry: BasketSimpleEntry): boolean => basketSimpleEntry.productId === props.productId
    )
);

export const selectIsOnPotentialOrderRoute$ = createSelector(selectUrl, (url: string): boolean =>
  isOnPotentialRoute(url)
);

export const selectPotentialOrderProductsIds = createSelector(
  selectBasketEntries([Type.Normal]),
  selectProductsEnrichedFromCategoryByStructuralNode(StructuralNode.Delivery),
  selectProductsEnrichedFromCategoryByStructuralNode(StructuralNode.Payment),
  (
    basketEntries: BasketEntry[],
    deliveryProductsEnriched: ProductEnriched[],
    paymentProductsEnriched: ProductEnriched[]
  ): number[] => [
    ...basketEntries.map((basketEntry: BasketEntry): number => basketEntry.productId),
    ...deliveryProductsEnriched.map((deliveryProductEnriched: ProductEnriched): number => deliveryProductEnriched.id),
    ...paymentProductsEnriched.map((paymentProductEnriched: ProductEnriched): number => paymentProductEnriched.id)
  ]
);

export const selectPriceTotal = createSelector(
  selectBasketEntries([Type.Normal, Type.Delivery, Type.Payment]),
  (basketEntries: BasketEntry[]): number =>
    basketEntries.reduce((previousValue: number, currentValue: BasketEntry): number => {
      return previousValue + currentValue.quantity * (currentValue.product ? currentValue.product.price : 0);
    }, 0)
);

export const selectQuantityTotal = createSelector(
  selectBasketSimpleEntriesAsArray,
  (basketSimpleEntriesAsArray: BasketSimpleEntry[]): number =>
    basketSimpleEntriesAsArray
      .filter((basketSimpleEntry: BasketSimpleEntry): boolean => basketSimpleEntry.type === Type.Normal)
      .reduce((previousValue: number, currentValue: BasketSimpleEntry): number => {
        return previousValue + currentValue.quantity;
      }, 0)
);
