import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import * as fromBasketReducers from '../reducers/basket.reducers';
import { BasketSimpleEntry } from '../../models/basket.model';
import { getBasketSimpleEntriesAsArray } from './basket.utils';

export const selectBasketFeature = (state: State): fromBasketReducers.State => state.basket;

export const selectBasketSimpleEntriesAsArray = createSelector(
  selectBasketFeature,
  (basketFeature: fromBasketReducers.State): BasketSimpleEntry[] => getBasketSimpleEntriesAsArray(basketFeature.list)
);

export const selectBasketSimpleEntriesAsKeyValue = createSelector(
  selectBasketFeature,
  (basketFeature: fromBasketReducers.State): { [id: number]: BasketSimpleEntry } => basketFeature.list
);
