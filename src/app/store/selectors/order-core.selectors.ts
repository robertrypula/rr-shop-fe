import { createSelector } from '@ngrx/store';

import { OrderItemStore } from '../../models/order-item.model';
import { OrderStore } from '../../models/order.model';
import * as fromOrderReducers from '../reducers/order.reducers';
import { POTENTIAL_ORDER_UUID } from '../reducers/order.reducers';
import { ApiCall } from '../../models/page.model';
import { State } from '../reducers';
import { getAsArrayUuid } from '../../utils/transfomation.utils';

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

export const selectOrderItemsStore = createSelector(
  selectOrderFeature,
  (orderFeature: fromOrderReducers.State): OrderItemStore[] =>
    getAsArrayUuid(orderFeature.entities[POTENTIAL_ORDER_UUID].orderItemsStore)
);

export const selectOrdersStore = createSelector(
  selectOrderFeature,
  (orderFeature: fromOrderReducers.State): OrderStore[] => getAsArrayUuid(orderFeature.entities)
);
