import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import * as fromOrderReducers from '../reducers/order.reducers';
import { OrderStore } from '../../models/order.model';
import { ApiCall } from '../../models/generic.model';
import { getOrdersStoreAsArray } from './order.utils';

export const selectOrderFeature = (state: State): fromOrderReducers.State => state.order;

export const selectApiCallCreateOrder = createSelector(
  selectOrderFeature,
  (orderFeature: fromOrderReducers.State): ApiCall => orderFeature.apiCallCreateOrder
);

export const selectApiCallOrder = createSelector(
  selectOrderFeature,
  (orderFeature: fromOrderReducers.State): ApiCall => orderFeature.apiCallOrder
);

export const selectOrdersStoreAsArray = createSelector(
  selectOrderFeature,
  (orderFeature: fromOrderReducers.State): OrderStore[] => getOrdersStoreAsArray(orderFeature.entities)
);

export const selectOrdersStoreAsKeyValue = createSelector(
  selectOrderFeature,
  (orderFeature: fromOrderReducers.State): { [id: number]: OrderStore } => orderFeature.entities
);
