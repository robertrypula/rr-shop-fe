import { Action, createReducer, on } from '@ngrx/store';

import * as fromAuthorizationActions from '../actions/authorization.actions';
import { LocalStorageKey } from '../../models/local-storage.model';

export interface State {
  localStorageKey: LocalStorageKey;
  // ----
  token: string;
}

export const initialState: State = {
  localStorageKey: LocalStorageKey.Authorization,
  // ----
  token: null
};

const authorizationReducer = createReducer(
  initialState,
  on(fromAuthorizationActions.setToken, (state: State, { token }): State => ({ ...state, token }))
);

export function reducer(state: State | undefined, action: Action) {
  return authorizationReducer(state, action);
}
