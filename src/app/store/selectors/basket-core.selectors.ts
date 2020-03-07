import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import * as fromBasketReducers from '../reducers/basket.reducers';
import { BasketSimpleEntry } from '../../models/basket.model';

export const selectBasketFeature = (state: State): fromBasketReducers.State => state.basket;

export const selectBasketSimpleEntriesAsArray = createSelector(
  selectBasketFeature,
  (basketFeature: fromBasketReducers.State): BasketSimpleEntry[] =>
    Object.keys(basketFeature.list).map((key: string): BasketSimpleEntry => basketFeature.list[key])
);

export const selectBasketSimpleEntriesAsKeyValue = createSelector(
  selectBasketFeature,
  (basketFeature: fromBasketReducers.State): { [id: number]: BasketSimpleEntry } => basketFeature.list
);
