import { createSelector } from '@ngrx/store';

import { SMALL_DEVICE_DEFINITION } from '../../config';
import { State } from '../reducers';
import { Device } from '../../models/viewport.model';
import * as fromViewportReducers from '../reducers/viewport.reducers';

import { selectNavigationId } from './router.selectors';

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

export const selectIsSmallDevice = createSelector(selectDevice, (device: Device): boolean =>
  SMALL_DEVICE_DEFINITION.includes(device)
);

export const selectGetFurtherNavigationIdOnlyAtSmallerDevices = createSelector(
  selectIsSmallDevice,
  selectNavigationId,
  (isDeviceSmall: boolean, navigationId: number): number => (navigationId > 1 && isDeviceSmall ? navigationId : 0)
);
