import { createSelector } from '@ngrx/store';

import { Order, OrderStore } from '../../models/order.model';
import { ProductStore, Product, Type } from '../../models/product.model';
import { selectProductsStore } from './product-core.selectors';
import { selectOrderItemsStore, selectOrdersStore } from './order-core.selectors';
import { toOrderWithAllRelations, toOrderItem, extractClientDetailsForm } from './order.utils';
import { selectProductsFromCategoryByStructuralNode } from './product.selectors';
import { StructuralNode } from '../../models/category.model';
import { selectUrl } from './router.selectors';
import { getOrderUuid, isOnOrderRoute, isOnPotentialOrderRoute } from '../../utils/routing.utils';
import { OrderItem, OrderItemStore } from '../../models/order-item.model';

export const selectUrlOrderUuid = createSelector(selectUrl, (url: string): string => {
  return getOrderUuid(url);
});

export const selectActiveOrder = createSelector(
  selectOrdersStore,
  selectProductsStore,
  selectUrlOrderUuid,
  (ordersStore: OrderStore[], productsStore: ProductStore[], urlOrderUuid: string): Order => {
    const foundOrderStore: OrderStore = ordersStore.find(
      (orderStore: OrderStore): boolean => orderStore.uuid === urlOrderUuid
    );

    return foundOrderStore ? toOrderWithAllRelations(foundOrderStore, productsStore) : null;
  }
);

export const selectIsOnOrderRoute = createSelector(selectUrl, (url: string): boolean => {
  return isOnOrderRoute(url);
});

export const selectIsOnPotentialOrderRoute$ = createSelector(selectUrl, (url: string): boolean =>
  isOnPotentialOrderRoute(url)
);

export const selectClientDetailsFormByUuid = (uuid: string) =>
  createSelector(
    selectOrdersStore,
    (ordersStore: OrderStore[]): ClientDetailsForm => {
      const foundOrderStore: OrderStore = ordersStore.find(
        (orderStore: OrderStore): boolean => orderStore.uuid === uuid
      );

      return foundOrderStore ? extractClientDetailsForm(foundOrderStore) : null;
    }
  );

export const selectOrderByUuid = (uuid: string) =>
  createSelector(
    selectOrdersStore,
    selectProductsStore,
    (ordersStore: OrderStore[], productsStore: ProductStore[]): Order => {
      const foundOrderStore: OrderStore = ordersStore.find(
        (orderStore: OrderStore): boolean => orderStore.uuid === uuid
      );

      return foundOrderStore ? toOrderWithAllRelations(foundOrderStore, productsStore) : null;
    }
  );

// TODO remove this selector
export const selectOrderItems = (types: Type[] = [Type.Product]) =>
  createSelector(
    selectOrderItemsStore,
    selectProductsStore,
    (orderItemsStore: OrderItemStore[], productsStore: ProductStore[]): OrderItem[] =>
      orderItemsStore
        .filter((orderItemStore: OrderItemStore): boolean => types.includes(orderItemStore.type))
        .map((orderItemStore: OrderItemStore): OrderItem => toOrderItem(orderItemStore, productsStore))
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
  createSelector(selectOrdersStore, (ordersStore: OrderStore[]): string => {
    const foundOrderStore: OrderStore = ordersStore.find((orderStore: OrderStore): boolean => orderStore.uuid === uuid);

    return foundOrderStore ? foundOrderStore.promoCodeTextField : '';
  });
