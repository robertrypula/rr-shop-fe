import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import * as fromBar from './reducers/bar.reducers';
import * as fromBasket from './reducers/basket.reducers';
import * as fromCategory from './reducers/category.reducers';
import * as fromProduct from './reducers/product.reducers';
import { environment } from '../../environments/environment';

export interface State {
  bar: fromBar.State;
  basket: fromBasket.State;
  category: fromCategory.State;
  product: fromProduct.State;
}

export const reducers: ActionReducerMap<State> = {
  bar: fromBar.reducer,
  basket: fromBasket.reducer,
  category: fromCategory.reducer,
  product: fromProduct.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
