import { Action, createReducer } from '@ngrx/store';

import { Product } from '../../models/product.model';

export interface State {
  [id: number]: Product;
}

export const initialState: State = {};

const productReducer = createReducer(initialState);

export function reducer(state: State | undefined, action: Action) {
  return productReducer(state, action);
}
