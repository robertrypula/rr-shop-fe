import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import * as fromOrderReducers from '../reducers/order.reducers';
import { OrderItemStore } from '../../models/order.model';
import { getOrderItemsStoreAsArray } from './order.utils';
import { ApiCall } from '../../models/page.model';
import { POTENTIAL_ORDER_ID } from '../reducers/order.reducers';

export const selectOrderFeature = (state: State): fromOrderReducers.State => state.order;

export const selectApiCallCreateOrder = createSelector(
  selectOrderFeature,
  (orderFeature: fromOrderReducers.State): ApiCall => orderFeature.apiCallCreateOrder
);

export const selectApiCallOrder = createSelector(
  selectOrderFeature,
  (orderFeature: fromOrderReducers.State): ApiCall => orderFeature.apiCallOrder
);

export const selectApiCallPotentialOrderProducts = createSelector(
  selectOrderFeature,
  (orderFeature: fromOrderReducers.State): ApiCall => orderFeature.apiCallPotentialOrderProducts
);

export const selectOrderItemsStoreAsArray = createSelector(
  selectOrderFeature,
  (orderFeature: fromOrderReducers.State): OrderItemStore[] =>
    getOrderItemsStoreAsArray(orderFeature.entities[POTENTIAL_ORDER_ID].orderItems)
);

export const selectOrderItemsStoreAsKeyValue = createSelector(
  selectOrderFeature,
  (orderFeature: fromOrderReducers.State): { [id: number]: OrderItemStore } =>
    orderFeature.entities[POTENTIAL_ORDER_ID].orderItems
);
