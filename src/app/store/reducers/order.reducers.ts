import { Action, createReducer, on } from '@ngrx/store';

import * as fromOrderActions from '../actions/order.actions';
import { ApiCall } from '../../models/generic.model';
import { OrderStore } from '../../models/order.model';

export interface State {
  apiCallCreateOrder: ApiCall;
  apiCallOrder: ApiCall;
  entities: {
    [id: number]: OrderStore;
  };
  lastEntityId: number;
}

export const initialState: State = {
  apiCallCreateOrder: ApiCall.Initial,
  apiCallOrder: ApiCall.Initial,
  entities: {},
  lastEntityId: 0
};

const orderReducer = createReducer(
  initialState,
  on(fromOrderActions.createOrderRequest, (state: State): State => ({ ...state, apiCallCreateOrder: ApiCall.Request })),
  on(fromOrderActions.createOrderSuccess, (state: State): State => ({ ...state, apiCallCreateOrder: ApiCall.Success })),
  on(fromOrderActions.createOrderFailure, (state: State): State => ({ ...state, apiCallCreateOrder: ApiCall.Failure })),
  on(fromOrderActions.orderRequest, (state: State): State => ({ ...state, apiCallOrder: ApiCall.Request })),
  on(fromOrderActions.orderSuccess, (state: State): State => ({ ...state, apiCallOrder: ApiCall.Success })),
  on(fromOrderActions.orderFailure, (state: State): State => ({ ...state, apiCallOrder: ApiCall.Failure }))
);

export function reducer(state: State | undefined, action: Action) {
  return orderReducer(state, action);
}
