import { Action, createReducer, on } from '@ngrx/store';

import { ApiCall } from '../../models/page.model';
import { ProductStore } from '../../models/product.model';
import * as fromSearchActions from '../actions/search.actions';

export interface State {
  apiCallSearch: ApiCall;
  productIds: number[];
  query: string;
}

export const initialState: State = {
  apiCallSearch: ApiCall.Initial,
  productIds: [],
  query: ''
};

const categoryReducer = createReducer(
  initialState,
  on(fromSearchActions.searchRequest, (state: State): State => ({ ...state, apiCallSearch: ApiCall.Request })),
  on(fromSearchActions.searchFailure, (state: State): State => ({ ...state, apiCallSearch: ApiCall.Failure })),
  on(
    fromSearchActions.searchSuccess,
    (state: State, { productsStore }): State => ({
      ...state,
      apiCallSearch: ApiCall.Failure,
      productIds: productsStore.map((productStore: ProductStore): number => productStore.id)
    })
  ),
  on(fromSearchActions.setQuery, (state: State, { query }): State => ({ ...state, query }))
);

export function reducer(state: State | undefined, action: Action) {
  return categoryReducer(state, action);
}
