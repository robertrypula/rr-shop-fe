import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromBasket from './basket.reducers';
import * as fromProduct from './product.reducers';

export interface State {
  basket: fromBasket.State;
  product: fromProduct.State;
}

export const reducers: ActionReducerMap<State> = {
  basket: fromBasket.reducer,
  product: fromProduct.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
