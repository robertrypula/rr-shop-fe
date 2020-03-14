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

export const selectOrderItems = (types: Type[] = [Type.Normal]) =>
  createSelector(
    selectOrderItemsStoreAsArray,
    selectProductsAsKeyValue,
    (orderItemsStoreAsArray: OrderItemStore[], productsAsKeyValue: { [id: number]: Product }): OrderItem[] =>
      orderItemsStoreAsArray
        .filter((orderItemStore: OrderItemStore): boolean => types.includes(orderItemStore.type))
        .map((orderItemStore: OrderItemStore): OrderItem => toOrderItem(orderItemStore, productsAsKeyValue))
  );

export const selectOrderItemStoreByProductId = createSelector(
  selectOrderItemsStoreAsArray,
  (orderItemsStoreAsArray: OrderItemStore[], props: { productId: number }): OrderItemStore =>
    orderItemsStoreAsArray.find(
      (orderItemStore: OrderItemStore): boolean => orderItemStore.productId === props.productId
    )
);

export const selectIsOrderValid = createSelector(
  selectOrderItems([Type.Normal]),
  selectOrderItems([Type.Payment]),
  selectOrderItems([Type.Delivery]),
  (orderItemsNormal: OrderItem[], orderItemsPayment: OrderItem[], orderItemsDelivery: OrderItem[]): boolean => {
    return orderItemsNormal.length > 0 && orderItemsDelivery.length === 1 && orderItemsPayment.length === 1;
  }
);

export const selectOrderByUuid = (uuid: string) =>
  createSelector(
    selectOrdersStoreAsArray,
    (ordersStoreAsArray: OrderStore[]): Order => {
      const orderStoreFind: OrderStore = ordersStoreAsArray.find(
        (orderStore: OrderStore): boolean => orderStore.uuid === uuid
      );

      return orderStoreFind ? toOrder(orderStoreFind) : null;
    }
  );

export const selectIsOnPotentialOrderRoute$ = createSelector(selectUrl, (url: string): boolean =>
  isOnPotentialOrderRoute(url)
);

export const selectPotentialOrderProductsIds = createSelector(
  selectOrderItems([Type.Normal]),
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

export const selectPriceSum = (types: Type[]) =>
  createSelector(selectOrderItems(types), (orderItems: OrderItem[]): number =>
    orderItems.reduce((previousValue: number, currentValue: OrderItem): number => {
      return previousValue + currentValue.quantity * (currentValue.product ? currentValue.product.price : 0);
    }, 0)
  );

export const selectQuantityTotal = createSelector(
  selectOrderItemsStoreAsArray,
  (orderItemsStoreAsArray: OrderItemStore[]): number =>
    orderItemsStoreAsArray
      .filter((orderItemStore: OrderItemStore): boolean => orderItemStore.type === Type.Normal)
      .reduce((previousValue: number, currentValue: OrderItemStore): number => {
        return previousValue + currentValue.quantity;
      }, 0)
);

export const selectIsOnOrderRoute = createSelector(selectUrl, (url: string): boolean => {
  return isOnOrderRoute(url);
});

export const selectUrlOrderUuid = createSelector(selectUrl, (url: string): string => {
  return getOrderUuid(url);
});
