import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromBar from './reducers/bar.reducers';
import * as fromBasket from './reducers/basket.reducers';
import * as fromProduct from './reducers/product.reducers';

export interface State {
  bar: fromBar.State;
  basket: fromBasket.State;
  product: fromProduct.State;
}

export const reducers: ActionReducerMap<State> = {
  bar: fromBar.reducer,
  basket: fromBasket.reducer,
  product: fromProduct.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
