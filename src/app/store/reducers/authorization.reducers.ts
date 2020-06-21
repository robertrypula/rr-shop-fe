import { Action, createReducer, on } from '@ngrx/store';

import * as fromAuthorizationActions from '../actions/authorization.actions';

export interface State {
  token: string;
}

export const initialState: State = {
  token: null
};

const authorizationReducer = createReducer(
  initialState,
  on(fromAuthorizationActions.setToken, (state: State, { token }): State => ({ ...state, token }))
);

export function reducer(state: State | undefined, action: Action) {
  return authorizationReducer(state, action);
}
