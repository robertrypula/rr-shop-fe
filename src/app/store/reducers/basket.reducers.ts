import { Action, combineReducers, createReducer, on } from '@ngrx/store';

import * as fromBasketActions from '../actions/basket.actions';

export interface State {
  productId: number;
}

export const initialState: State = {
  productId: null
};

const basketReducer = createReducer(
  initialState,
  on(fromBasketActions.addProduct, (state, { productId }) => ({ ...state, productId }))
);

export function reducer(state: State | undefined, action: Action) {
  return basketReducer(state, action);
}
