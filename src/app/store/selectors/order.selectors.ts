import { createSelector } from '@ngrx/store';

import { OrderEntry, OrderSimpleEntry, Type } from '../../models/order.model';
import { Product, ProductEnriched } from '../../models/product.model';
import { selectProductsAsKeyValue } from './product-core.selectors';
import { selectOrderSimpleEntriesAsArray } from './order-core.selectors';
import { toOrderEntry } from './order.utils';
import { selectProductsEnrichedFromCategoryByStructuralNode } from './product.selectors';
import { StructuralNode } from '../../models/category.model';
import { selectUrl } from './router.selectors';
import { getOrderUuid, isOnOrderRoute, isOnPotentialOrderRoute } from '../../utils/routing.util';

export const selectOrderEntries = (types: Type[] = [Type.Normal]) =>
  createSelector(
    selectOrderSimpleEntriesAsArray,
    selectProductsAsKeyValue,
    (orderSimpleEntriesAsArray: OrderSimpleEntry[], productsAsKeyValue: { [id: number]: Product }): OrderEntry[] =>
      orderSimpleEntriesAsArray
        .filter((orderSimpleEntry: OrderSimpleEntry): boolean => types.includes(orderSimpleEntry.type))
        .map(
          (orderSimpleEntry: OrderSimpleEntry): OrderEntry => toOrderEntry(orderSimpleEntry, productsAsKeyValue)
        )
  );

export const selectOrderSimpleEntryByProductId = createSelector(
  selectOrderSimpleEntriesAsArray,
  (orderSimpleEntriesAsArray: OrderSimpleEntry[], props: { productId: number }): OrderSimpleEntry =>
    orderSimpleEntriesAsArray.find(
      (orderSimpleEntry: OrderSimpleEntry): boolean => orderSimpleEntry.productId === props.productId
    )
);

export const selectIsOrderValid = createSelector(
  selectOrderEntries([Type.Normal]),
  selectOrderEntries([Type.Payment]),
  selectOrderEntries([Type.Delivery]),
  (
    orderEntriesNormal: OrderEntry[],
    orderEntriesPayment: OrderEntry[],
    orderEntriesDelivery: OrderEntry[]
  ): boolean => {
    return orderEntriesNormal.length > 0 && orderEntriesDelivery.length === 1 && orderEntriesPayment.length === 1;
  }
);

export const selectIsOnPotentialOrderRoute$ = createSelector(selectUrl, (url: string): boolean =>
  isOnPotentialOrderRoute(url)
);

export const selectPotentialOrderProductsIds = createSelector(
  selectOrderEntries([Type.Normal]),
  selectProductsEnrichedFromCategoryByStructuralNode(StructuralNode.Delivery),
  selectProductsEnrichedFromCategoryByStructuralNode(StructuralNode.Payment),
  (
    orderEntries: OrderEntry[],
    deliveryProductsEnriched: ProductEnriched[],
    paymentProductsEnriched: ProductEnriched[]
  ): number[] => [
    ...orderEntries.map((orderEntry: OrderEntry): number => orderEntry.productId),
    ...deliveryProductsEnriched.map((deliveryProductEnriched: ProductEnriched): number => deliveryProductEnriched.id),
    ...paymentProductsEnriched.map((paymentProductEnriched: ProductEnriched): number => paymentProductEnriched.id)
  ]
);

export const selectPriceSum = (types: Type[]) =>
  createSelector(selectOrderEntries(types), (orderEntries: OrderEntry[]): number =>
    orderEntries.reduce((previousValue: number, currentValue: OrderEntry): number => {
      return previousValue + currentValue.quantity * (currentValue.product ? currentValue.product.price : 0);
    }, 0)
  );

export const selectQuantityTotal = createSelector(
  selectOrderSimpleEntriesAsArray,
  (orderSimpleEntriesAsArray: OrderSimpleEntry[]): number =>
    orderSimpleEntriesAsArray
      .filter((orderSimpleEntry: OrderSimpleEntry): boolean => orderSimpleEntry.type === Type.Normal)
      .reduce((previousValue: number, currentValue: OrderSimpleEntry): number => {
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
