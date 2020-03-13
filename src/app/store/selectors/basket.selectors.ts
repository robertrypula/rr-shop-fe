import { createSelector } from '@ngrx/store';

import { BasketEntry, BasketSimpleEntry, Type } from '../../models/basket.model';
import { Product, ProductEnriched } from '../../models/product.model';
import { selectProductsAsKeyValue } from './product-core.selectors';
import { selectBasketSimpleEntriesAsArray } from './basket-core.selectors';
import { toBasketEntry } from './basket.utils';
import { selectProductsEnrichedFromCategoryByStructuralNode } from './product.selectors';
import { StructuralNode } from '../../models/category.model';
import { selectUrl } from './router.selectors';
import { getOrderUuid, isOnOrderRoute, isOnPotentialOrderRoute } from '../../utils/routing.util';

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

export const selectIsBasketValid = createSelector(
  selectBasketEntries([Type.Normal]),
  selectBasketEntries([Type.Payment]),
  selectBasketEntries([Type.Delivery]),
  (
    basketEntriesNormal: BasketEntry[],
    basketEntriesPayment: BasketEntry[],
    basketEntriesDelivery: BasketEntry[]
  ): boolean => {
    return basketEntriesNormal.length > 0 && basketEntriesDelivery.length === 1 && basketEntriesPayment.length === 1;
  }
);

export const selectIsOnPotentialOrderRoute$ = createSelector(selectUrl, (url: string): boolean =>
  isOnPotentialOrderRoute(url)
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

export const selectPriceSum = (types: Type[]) =>
  createSelector(selectBasketEntries(types), (basketEntries: BasketEntry[]): number =>
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

export const selectIsOnOrderRoute = createSelector(selectUrl, (url: string): boolean => {
  return isOnOrderRoute(url);
});

export const selectUrlOrderUuid = createSelector(selectUrl, (url: string): string => {
  return getOrderUuid(url);
});

// export const selectOrderByUuid = createSelector(
// selectOrdersStoreAsArray,
// (ordersStoreAsArray: OrderStore[], props: { uuid: string }): Order => {
//   const orderStoreFind: OrderStore = ordersStoreAsArray.find(
//     (orderStore: OrderStore): boolean => orderStore.uuid === props.uuid
//   );
//
//   return orderStoreFind ? toOrder(orderStoreFind) : null;
// }
// );
