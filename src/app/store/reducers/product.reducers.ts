import { Action, createReducer, on } from '@ngrx/store';

import * as fromProductActions from '../actions/product.actions';
import { Product } from '../../models/product.model';

export interface State {
  list: {
    [id: number]: Product;
  };
}

export const initialState: State = {
  list: {}
};

const productReducer = createReducer(
  initialState,
  on(
    fromProductActions.productsAllSimpleSuccess,
    (state: State, { products }): State => {
      const newState: State = { ...state, list: { ...state.list } };

      products.forEach((product: Product): void => {
        newState.list[product.id] = { ...state.list[product.id], ...product };
      });

      return newState;
    }
  )
);

export function reducer(state: State | undefined, action: Action) {
  return productReducer(state, action);
}
