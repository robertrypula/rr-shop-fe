import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import { Bar } from '../../models/bar.model';

export const selectBarFeature = (state: State) => state.bar;

export const selectBars = createSelector(
  selectBarFeature,
  (bar): Bar[] => Object.keys(bar).map(key => bar[key])
);
