import { createSelector } from '@ngrx/store';

import { Bar, BarStore } from '../../models/bar.model';

import { selectBarsStore } from './bar-core.selectors';
import { toBar } from './bar.utiils';

export const selectBars = createSelector(selectBarsStore, (barsStore: BarStore[]): Bar[] => {
  return barsStore.map((barStore: BarStore): Bar => toBar(barStore));
});
