import { createSelector } from '@ngrx/store';

import { Order, OrderStore } from '../../models/order.model';
import { selectOrdersStoreAsArray } from './order-core.selectors';
import { toOrder } from './order.utils';
import { selectUrl } from './router.selectors';
import { getOrderUuid, isOnOrderRoute } from '../../utils/routing.util';

export const selectIsOnOrderRoute = createSelector(selectUrl, (url: string): boolean => {
  return isOnOrderRoute(url);
});

export const selectUrlOrderUuid = createSelector(selectUrl, (url: string): string => {
  return getOrderUuid(url);
});

export const selectOrderByUuid = createSelector(
  selectOrdersStoreAsArray,
  (ordersStoreAsArray: OrderStore[], props: { uuid: string }): Order => {
    const orderStoreFind: OrderStore = ordersStoreAsArray.find(
      (orderStore: OrderStore): boolean => orderStore.uuid === props.uuid
    );

    return orderStoreFind ? toOrder(orderStoreFind) : null;
  }
);
