import { createSelector } from '@ngrx/store';

import { Bar } from '../../models/bar.model';
import * as fromBarReducers from '../reducers/bar.reducers';
import { State } from '../reducers';
import { getAsArray } from '../../utils/transfomation.utils';

export const selectBarFeature = (state: State): fromBarReducers.State => state.bar;

export const selectBars = createSelector(selectBarFeature, (barFeature: fromBarReducers.State): Bar[] =>
  getAsArray(barFeature)
);
