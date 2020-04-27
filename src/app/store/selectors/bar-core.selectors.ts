import { createSelector } from '@ngrx/store';

import { BarStore } from '../../models/bar.model';
import * as fromBarReducers from '../reducers/bar.reducers';
import { State } from '../reducers';
import { getAsArray } from '../../utils/transfomation.utils';

export const selectBarFeature = (state: State): fromBarReducers.State => state.bar;

export const selectBarsStore = createSelector(selectBarFeature, (barFeature: fromBarReducers.State): BarStore[] =>
  getAsArray(barFeature.entities)
);

export const selectIsCookieModalAccepted = createSelector(
  selectBarFeature,
  (barFeature: fromBarReducers.State): boolean => barFeature.isCookieModalAccepted
);
