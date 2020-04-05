import { createSelector } from '@ngrx/store';

import { Order, OrderStore } from '../../models/order.model';
import { ProductStore, Product, Type } from '../../models/product.model';
import { selectProductsStoreAsKeyValue } from './product-core.selectors';
import { selectOrderItemsStoreAsArray, selectOrdersStoreAsArray } from './order-core.selectors';
import { toOrderWithAllRelations, toOrderItem, extractClientDetailsForm } from './order.utils';
import { selectProductsFromCategoryByStructuralNode } from './product.selectors';
import { StructuralNode } from '../../models/category.model';
import { selectUrl } from './router.selectors';
import { getOrderUuid, isOnOrderRoute, isOnPotentialOrderRoute } from '../../utils/routing.utils';
import { OrderItem, OrderItemStore } from '../../models/order-item.model';

export const selectIsOnOrderRoute = createSelector(selectUrl, (url: string): boolean => {
  return isOnOrderRoute(url);
});

export const selectIsOnPotentialOrderRoute$ = createSelector(selectUrl, (url: string): boolean =>
  isOnPotentialOrderRoute(url)
);

export const selectClientDetailsFormByUuid = (uuid: string) =>
  createSelector(
    selectOrdersStoreAsArray,
    (ordersStoreAsArray: OrderStore[]): ClientDetailsForm => {
      const orderStoreFind: OrderStore = ordersStoreAsArray.find(
        (orderStore: OrderStore): boolean => orderStore.uuid === uuid
      );

      return orderStoreFind ? extractClientDetailsForm(orderStoreFind) : null;
    }
  );

export const selectOrderByUuid = (uuid: string) =>
  createSelector(
    selectOrdersStoreAsArray,
    selectProductsStoreAsKeyValue,
    (ordersStoreAsArray: OrderStore[], productsStoreAsKeyValue: { [id: number]: ProductStore }): Order => {
      const orderStoreFind: OrderStore = ordersStoreAsArray.find(
        (orderStore: OrderStore): boolean => orderStore.uuid === uuid
      );

      return orderStoreFind ? toOrderWithAllRelations(orderStoreFind, productsStoreAsKeyValue) : null;
    }
  );

export const selectOrderItems = (types: Type[] = [Type.Product]) =>
  createSelector(
    selectOrderItemsStoreAsArray,
    selectProductsStoreAsKeyValue,
    (orderItemsStoreAsArray: OrderItemStore[], productsAsKeyValue: { [id: number]: ProductStore }): OrderItem[] =>
      orderItemsStoreAsArray
        .filter((orderItemStore: OrderItemStore): boolean => types.includes(orderItemStore.type))
        .map((orderItemStore: OrderItemStore): OrderItem => toOrderItem(orderItemStore, productsAsKeyValue))
  );

export const selectPotentialOrderProductsIds = createSelector(
  selectOrderItems([Type.Product]),
  selectProductsFromCategoryByStructuralNode(StructuralNode.Delivery),
  selectProductsFromCategoryByStructuralNode(StructuralNode.Payment),
  (orderItems: OrderItem[], deliveryProducts: Product[], paymentProducts: Product[]): number[] => [
    ...orderItems.map((orderItem: OrderItem): number => orderItem.productId),
    ...deliveryProducts.map((deliveryProduct: Product): number => deliveryProduct.id),
    ...paymentProducts.map((paymentProduct: Product): number => paymentProduct.id)
  ]
);

export const selectPromoCodeTextFieldByUuid = (uuid: string) =>
  createSelector(
    selectOrdersStoreAsArray,
    selectProductsStoreAsKeyValue,
    (ordersStoreAsArray: OrderStore[]): string => {
      const orderStoreFind: OrderStore = ordersStoreAsArray.find(
        (orderStore: OrderStore): boolean => orderStore.uuid === uuid
      );

      return orderStoreFind ? orderStoreFind.promoCodeTextField : '';
    }
  );

export const selectUrlOrderUuid = createSelector(selectUrl, (url: string): string => {
  return getOrderUuid(url);
});
