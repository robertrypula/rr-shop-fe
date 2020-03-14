import { createSelector } from '@ngrx/store';

import { Order, OrderItem, OrderItemStore, OrderStore, Type } from '../../models/order.model';
import { Product, ProductEnriched } from '../../models/product.model';
import { selectProductsAsKeyValue } from './product-core.selectors';
import { selectOrderItemsStoreAsArray, selectOrdersStoreAsArray } from './order-core.selectors';
import { toOrder, toOrderItem } from './order.utils';
import { selectProductsEnrichedFromCategoryByStructuralNode } from './product.selectors';
import { StructuralNode } from '../../models/category.model';
import { selectUrl } from './router.selectors';
import { getOrderUuid, isOnOrderRoute, isOnPotentialOrderRoute } from '../../utils/routing.util';

export const selectOrderItems = (types: Type[] = [Type.Product]) =>
  createSelector(
    selectOrderItemsStoreAsArray,
    selectProductsAsKeyValue,
    (orderItemsStoreAsArray: OrderItemStore[], productsAsKeyValue: { [id: number]: Product }): OrderItem[] =>
      orderItemsStoreAsArray
        .filter((orderItemStore: OrderItemStore): boolean => types.includes(orderItemStore.type))
        .map((orderItemStore: OrderItemStore): OrderItem => toOrderItem(orderItemStore, productsAsKeyValue))
  );

// TODO when code that is using it will be moved to effect we can delete it
export const selectOrderItemStoreByProductId = createSelector(
  selectOrderItemsStoreAsArray,
  (orderItemsStoreAsArray: OrderItemStore[], props: { productId: number }): OrderItemStore =>
    orderItemsStoreAsArray.find(
      (orderItemStore: OrderItemStore): boolean => orderItemStore.productId === props.productId
    )
);

export const selectOrderByUuid = (uuid: string) =>
  createSelector(
    selectOrdersStoreAsArray,
    selectProductsAsKeyValue,
    (ordersStoreAsArray: OrderStore[], productsAsKeyValue: { [id: number]: Product }): Order => {
      const orderStoreFind: OrderStore = ordersStoreAsArray.find(
        (orderStore: OrderStore): boolean => orderStore.uuid === uuid
      );

      return orderStoreFind ? toOrder(orderStoreFind, productsAsKeyValue) : null;
    }
  );

export const selectIsOnPotentialOrderRoute$ = createSelector(selectUrl, (url: string): boolean =>
  isOnPotentialOrderRoute(url)
);

export const selectPotentialOrderProductsIds = createSelector(
  selectOrderItems([Type.Product]),
  selectProductsEnrichedFromCategoryByStructuralNode(StructuralNode.Delivery),
  selectProductsEnrichedFromCategoryByStructuralNode(StructuralNode.Payment),
  (
    orderItems: OrderItem[],
    deliveryProductsEnriched: ProductEnriched[],
    paymentProductsEnriched: ProductEnriched[]
  ): number[] => [
    ...orderItems.map((orderItem: OrderItem): number => orderItem.productId),
    ...deliveryProductsEnriched.map((deliveryProductEnriched: ProductEnriched): number => deliveryProductEnriched.id),
    ...paymentProductsEnriched.map((paymentProductEnriched: ProductEnriched): number => paymentProductEnriched.id)
  ]
);

export const selectIsOnOrderRoute = createSelector(selectUrl, (url: string): boolean => {
  return isOnOrderRoute(url);
});

export const selectUrlOrderUuid = createSelector(selectUrl, (url: string): string => {
  return getOrderUuid(url);
});
