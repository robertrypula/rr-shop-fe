import { Action, createReducer, on } from '@ngrx/store';

import * as fromPageActions from '../actions/page.actions';
import { ApiCall } from '../../models/root.model';

export interface State {
  apiCallProductsAtMainPage: ApiCall;
}

export const initialState: State = {
  apiCallProductsAtMainPage: ApiCall.Initial
};

const pageReducer = createReducer(
  initialState,
  on(
    fromPageActions.productsAtMainPageRequest,
    (state: State): State => ({ ...state, apiCallProductsAtMainPage: ApiCall.Request })
  ),
  on(
    fromPageActions.productsAtMainPageFailure,
    (state: State): State => ({ ...state, apiCallProductsAtMainPage: ApiCall.Failure })
  ),
  on(
    fromPageActions.productsAtMainPageSuccess,
    (state: State): State => ({ ...state, apiCallProductsAtMainPage: ApiCall.Failure })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return pageReducer(state, action);
}
