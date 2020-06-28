import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import * as fromAuthorization from './reducers/authorization.reducers';
import * as fromBar from './reducers/bar.reducers';
import * as fromCategory from './reducers/category.reducers';
import * as fromOrder from './reducers/order.reducers';
import * as fromPage from './reducers/page.reducers';
import * as fromProduct from './reducers/product.reducers';
import * as fromRouter from './reducers/router.reducers';
import * as fromSearch from './reducers/search.reducers';
import * as fromViewport from './reducers/viewport.reducers';

export interface State {
  authorization: fromAuthorization.State;
  bar: fromBar.State;
  category: fromCategory.State;
  order: fromOrder.State;
  page: fromPage.State;
  product: fromProduct.State;
  router: fromRouter.State;
  search: fromSearch.State;
  viewport: fromViewport.State;
}

export const reducers: ActionReducerMap<State> = {
  authorization: fromAuthorization.reducer,
  bar: fromBar.reducer,
  category: fromCategory.reducer,
  order: fromOrder.reducer,
  page: fromPage.reducer,
  product: fromProduct.reducer,
  router: fromRouter.reducer,
  search: fromSearch.reducer,
  viewport: fromViewport.reducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [
      { authorization: ['localStorageKey', 'token'] },
      { bar: ['localStorageKey', 'isCookieModalVisible'] },
      { order: ['localStorageKey', 'entities', 'lastOrderItemId'] }
    ],
    rehydrate: true,
    checkStorageAvailability: true
  })(reducer);
}

export const metaReducers: MetaReducer<State>[] = [localStorageSyncReducer];
