import { createAction, props } from '@ngrx/store';

import { Device } from '../../models/viewport.model';

export const setDevice = createAction('[Viewport] Set device', props<{ newValue: Device }>());

export const setIsScrolledDownThatHeaderIsNotVisible = createAction(
  '[Viewport] Set isScrolledDownThatHeaderIsNotVisible',
  props<{ newValue: boolean }>()
);
