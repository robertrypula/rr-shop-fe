import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import * as fromBar from './reducers/bar.reducers';
import * as fromCategory from './reducers/category.reducers';
import * as fromOrder from './reducers/order.reducers';
import * as fromPage from './reducers/page.reducers';
import * as fromProduct from './reducers/product.reducers';
import * as fromRouter from './reducers/router.reducers';
import * as fromViewport from './reducers/viewport.reducers';
import { environment } from '../../environments/environment';

export interface State {
  bar: fromBar.State;
  category: fromCategory.State;
  order: fromOrder.State;
  page: fromPage.State;
  product: fromProduct.State;
  router: fromRouter.State;
  viewport: fromViewport.State;
}

export const reducers: ActionReducerMap<State> = {
  bar: fromBar.reducer,
  category: fromCategory.reducer,
  order: fromOrder.reducer,
  page: fromPage.reducer,
  product: fromProduct.reducer,
  router: fromRouter.reducer,
  viewport: fromViewport.reducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [{ order: ['entities', 'lastOrderItemId'] }],
    rehydrate: true
  })(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [localStorageSyncReducer]
  : [localStorageSyncReducer];
