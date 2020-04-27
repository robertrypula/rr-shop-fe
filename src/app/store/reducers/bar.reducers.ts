import { Action, createReducer, on } from '@ngrx/store';

import * as fromBarActions from '../actions/bar.actions';
import { BarStore } from '../../models/bar.model';

export interface State {
  entities: {
    [id: number]: BarStore;
  };
  isCookieModalAccepted: boolean;
}

export const initialState: State = {
  entities: {},
  isCookieModalAccepted: false
};

export let barId = 0;

const barReducer = createReducer(
  initialState,
  on(
    fromBarActions.show,
    (state, { message, barType }): State => {
      barId++;
      return {
        ...state,
        entities: {
          ...state.entities,
          [barId]: { id: barId, message, barType }
        }
      };
    }
  ),
  on(fromBarActions.close, (state, { id }) => {
    const { [id]: toDelete, ...rest } = state.entities;

    return {
      ...state,
      entities: {
        ...rest
      }
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return barReducer(state, action);
}
