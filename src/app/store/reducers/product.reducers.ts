import { Action, createReducer, on } from '@ngrx/store';

import * as fromOrderActions from '../actions/order.actions';
import * as fromPageActions from '../actions/page.actions';
import { ApiCall } from '../../models/page.model';
import * as fromProductActions from '../actions/product.actions';
import { ProductStore } from '../../models/product.model';
import * as fromSearchActions from '../actions/search.actions';

export interface State {
  apiCallProduct: ApiCall;
  apiCallProductsAtCategory: ApiCall;
  apiCallProductsAtInit: ApiCall;
  apiCallProductsAtProduct: ApiCall;
  list: {
    [id: number]: ProductStore;
  };
}

export const initialState: State = {
  apiCallProduct: ApiCall.Initial,
  apiCallProductsAtCategory: ApiCall.Initial,
  apiCallProductsAtInit: ApiCall.Initial,
  apiCallProductsAtProduct: ApiCall.Initial,
  list: {}
};

const productReducer = createReducer(
  initialState,
  on(fromProductActions.productFailure, (state: State): State => ({ ...state, apiCallProduct: ApiCall.Failure })),
  on(fromProductActions.productRequest, (state: State): State => ({ ...state, apiCallProduct: ApiCall.Request })),
  on(fromProductActions.productSuccess, (state: State): State => ({ ...state, apiCallProduct: ApiCall.Success })),
  on(
    fromProductActions.productsAtCategoryFailure,
    (state: State): State => ({ ...state, apiCallProductsAtCategory: ApiCall.Failure })
  ),
  on(
    fromProductActions.productsAtCategoryRequest,
    (state: State): State => ({ ...state, apiCallProductsAtCategory: ApiCall.Request })
  ),
  on(
    fromProductActions.productsAtCategorySuccess,
    (state: State): State => ({ ...state, apiCallProductsAtCategory: ApiCall.Success })
  ),
  on(
    fromProductActions.productsAtInitFailure,
    (state: State): State => ({ ...state, apiCallProductsAtInit: ApiCall.Failure })
  ),
  on(
    fromProductActions.productsAtInitRequest,
    (state: State): State => ({ ...state, apiCallProductsAtInit: ApiCall.Request })
  ),
  on(
    fromProductActions.productsAtInitSuccess,
    (state: State): State => ({ ...state, apiCallProductsAtInit: ApiCall.Success })
  ),
  on(
    fromProductActions.productsAtProductFailure,
    (state: State): State => ({ ...state, apiCallProductsAtProduct: ApiCall.Failure })
  ),
  on(
    fromProductActions.productsAtProductRequest,
    (state: State): State => ({ ...state, apiCallProductsAtProduct: ApiCall.Request })
  ),
  on(
    fromProductActions.productsAtProductSuccess,
    (state: State): State => ({ ...state, apiCallProductsAtProduct: ApiCall.Success })
  ),
  on(
    fromProductActions.productSuccess,
    (state: State, { productStore }): State => ({
      ...state,
      list: { ...state.list, [productStore.id]: { ...state.list[productStore.id], ...productStore } }
    })
  ),
  on(
    fromOrderActions.potentialOrderProductsSuccess,
    fromPageActions.productsAtMainPageSuccess,
    fromProductActions.productsAtCategorySuccess,
    fromProductActions.productsAtInitSuccess,
    fromProductActions.productsAtProductSuccess,
    fromSearchActions.searchSuccess,
    (state: State, { productsStore }): State => {
      const newState: State = { ...state, list: { ...state.list } };

      productsStore.forEach((productStore: ProductStore): void => {
        newState.list[productStore.id] = { ...state.list[productStore.id], ...productStore };
      });

      return newState;
    }
  )
);

export function reducer(state: State | undefined, action: Action) {
  return productReducer(state, action);
}
