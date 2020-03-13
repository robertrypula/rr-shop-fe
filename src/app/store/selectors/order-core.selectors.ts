import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import * as fromOrderReducers from '../reducers/order.reducers';
import { OrderSimpleEntry } from '../../models/order.model';
import { getOrderSimpleEntriesAsArray } from './order.utils';
import { ApiCall } from '../../models/generic.model';

export const selectOrderFeature = (state: State): fromOrderReducers.State => state.order;

export const selectApiCallPotentialOrderProducts = createSelector(
  selectOrderFeature,
  (orderFeature: fromOrderReducers.State): ApiCall => orderFeature.apiCallPotentialOrderProducts
);

export const selectOrderSimpleEntriesAsArray = createSelector(
  selectOrderFeature,
  (orderFeature: fromOrderReducers.State): OrderSimpleEntry[] => getOrderSimpleEntriesAsArray(orderFeature.entities)
);

export const selectOrderSimpleEntriesAsKeyValue = createSelector(
  selectOrderFeature,
  (orderFeature: fromOrderReducers.State): { [id: number]: OrderSimpleEntry } => orderFeature.entities
);

export const selectApiCallCreateOrder = createSelector(
  selectOrderFeature,
  (orderFeature: fromOrderReducers.State): ApiCall => orderFeature.apiCallCreateOrder
);

export const selectApiCallOrder = createSelector(
  selectOrderFeature,
  (orderFeature: fromOrderReducers.State): ApiCall => orderFeature.apiCallOrder
);
