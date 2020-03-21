import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import * as fromOrderReducers from '../reducers/order.reducers';
import { OrderStore } from '../../models/order.model';
import { getAsArray } from './order.utils';
import { ApiCall } from '../../models/page.model';
import { POTENTIAL_ORDER_ID } from '../reducers/order.reducers';
import { OrderItemStore } from '../../models/order-item.model';

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

export const selectApiCallPromoCode = createSelector(
  selectOrderFeature,
  (orderFeature: fromOrderReducers.State): ApiCall => orderFeature.apiCallPromoCode
);

export const selectOrderItemsStoreAsArray = createSelector(
  selectOrderFeature,
  (orderFeature: fromOrderReducers.State): OrderItemStore[] =>
    getAsArray(orderFeature.entities[POTENTIAL_ORDER_ID].orderItemsStore)
);

export const selectOrderItemsStoreAsKeyValue = createSelector(
  selectOrderFeature,
  (orderFeature: fromOrderReducers.State): { [id: number]: OrderItemStore } =>
    orderFeature.entities[POTENTIAL_ORDER_ID].orderItemsStore
);

export const selectOrdersStoreAsArray = createSelector(
  selectOrderFeature,
  (orderFeature: fromOrderReducers.State): OrderStore[] => getAsArray(orderFeature.entities)
);

export const selectOrdersStoreAsKeyValue = createSelector(
  selectOrderFeature,
  (orderFeature: fromOrderReducers.State): { [id: number]: OrderStore } => orderFeature.entities
);
