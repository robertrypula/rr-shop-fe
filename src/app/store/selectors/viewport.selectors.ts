import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import * as fromViewportReducers from '../reducers/viewport.reducers';
import { Device } from '../../models/viewport.model';

export const selectViewportFeature = (state: State): fromViewportReducers.State => state.viewport;

export const selectDevice = createSelector(
  selectViewportFeature,
  (viewportFeature: fromViewportReducers.State): Device => {
    return viewportFeature.device;
  }
);

export const selectIsScrolledDownThatHeaderIsNotVisible = createSelector(
  selectViewportFeature,
  (viewportFeature: fromViewportReducers.State): boolean => {
    return viewportFeature.isScrolledDownThatHeaderIsNotVisible;
  }
);
