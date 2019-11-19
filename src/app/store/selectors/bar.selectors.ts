import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import { Bar } from '../../models/bar.model';
import * as fromBar from '../reducers/bar.reducers';

export const selectBarFeature = (state: State): fromBar.State => state.bar;

export const selectBars = createSelector(
  selectBarFeature,
  (barFeature: fromBar.State): Bar[] => Object.keys(barFeature).map((key: string): Bar => barFeature[+key])
);
