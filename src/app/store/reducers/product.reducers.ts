import { Action, createReducer, on } from '@ngrx/store';

import * as fromProductActions from '../actions/product.actions';
import { Product } from '../../models/product.model';
import { ApiCall } from '../../models/generic.model';

export interface State {
  apiCallProductsAtCategory: ApiCall;
  apiCallProductsAtInit: ApiCall;
  list: {
    [id: number]: Product;
  };
}

export const initialState: State = {
  apiCallProductsAtCategory: ApiCall.Initial,
  apiCallProductsAtInit: ApiCall.Initial,
  list: {}
};

const productReducer = createReducer(
  initialState,
  on(
    fromProductActions.productsAtCategoryRequest,
    (state: State): State => ({ ...state, apiCallProductsAtCategory: ApiCall.Request })
  ),
  on(
    fromProductActions.productsAtInitRequest,
    (state: State): State => ({ ...state, apiCallProductsAtInit: ApiCall.Request })
  ),
  on(
    fromProductActions.productsAtCategorySuccess,
    (state: State): State => ({ ...state, apiCallProductsAtCategory: ApiCall.Success })
  ),
  on(
    fromProductActions.productsAtInitSuccess,
    (state: State): State => ({ ...state, apiCallProductsAtInit: ApiCall.Success })
  ),
  on(
    fromProductActions.productsAtCategoryFailure,
    (state: State): State => ({ ...state, apiCallProductsAtCategory: ApiCall.Failure })
  ),
  on(
    fromProductActions.productsAtInitFailure,
    (state: State): State => ({ ...state, apiCallProductsAtInit: ApiCall.Failure })
  ),
  on(
    fromProductActions.productsAtInitSuccess,
    fromProductActions.productsAtCategorySuccess,
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
