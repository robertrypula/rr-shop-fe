import { Action, createReducer, on } from '@ngrx/store';

import * as fromViewportActions from '../actions/viewport.actions';
import { Device } from '../../models/viewport.model';

export interface State {
  device: Device;
  isScrolledDownThatHeaderIsNotVisible: boolean;
}

export const initialState: State = {
  device: null,
  isScrolledDownThatHeaderIsNotVisible: false
};

const viewportReducer = createReducer(
  initialState,
  on(
    fromViewportActions.setDevice,
    (state: State, { newValue }): State => {
      return { ...state, device: newValue };
    }
  ),
  on(
    fromViewportActions.setIsScrolledDownThatHeaderIsNotVisible,
    (state: State, { newValue }): State => {
      return { ...state, isScrolledDownThatHeaderIsNotVisible: newValue };
    }
  )
);

export function reducer(state: State | undefined, action: Action) {
  return viewportReducer(state, action);
}
