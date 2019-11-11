import { Action, createReducer, on } from '@ngrx/store';

import * as fromBarActions from '../actions/bar.actions';
import { Bar, BarType } from '../../models/bar.model';

export interface State {
  [id: number]: Bar;
}

export const initialState: State = {};

export let barId = 0;

const barReducer = createReducer(
  initialState,
  on(
    fromBarActions.showSuccess,
    (state, { message }): State => {
      barId++;
      return { ...state, [barId]: { id: barId, message, type: BarType.Success } };
    }
  ),
  on(fromBarActions.close, (state, { id }) => {
    const { [id]: toDelete, ...rest } = state;

    return rest;
  })
);

export function reducer(state: State | undefined, action: Action) {
  return barReducer(state, action);
}
