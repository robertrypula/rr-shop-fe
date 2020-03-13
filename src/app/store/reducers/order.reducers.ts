import { Action, createReducer, on } from '@ngrx/store';

import * as fromOrderActions from '../actions/order.actions';
import { OrderSimpleEntry, Type } from '../../models/order.model';
import { ApiCall } from '../../models/generic.model';

export interface State {
  apiCallCreateOrder: ApiCall;
  apiCallOrder: ApiCall;
  apiCallPotentialOrderProducts: ApiCall;
  entities: {
    [id: number]: OrderSimpleEntry;
  };
  lastEntityId: number;
}

export const initialState: State = {
  apiCallCreateOrder: ApiCall.Initial,
  apiCallOrder: ApiCall.Initial,
  apiCallPotentialOrderProducts: ApiCall.Initial,
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
  on(fromOrderActions.orderFailure, (state: State): State => ({ ...state, apiCallOrder: ApiCall.Failure })),
  on(
    fromOrderActions.potentialOrderProductsRequest,
    (state: State): State => ({ ...state, apiCallPotentialOrderProducts: ApiCall.Request })
  ),
  on(
    fromOrderActions.potentialOrderProductsSuccess,
    (state: State): State => ({ ...state, apiCallPotentialOrderProducts: ApiCall.Success })
  ),
  on(
    fromOrderActions.potentialOrderProductsFailure,
    (state: State): State => ({ ...state, apiCallPotentialOrderProducts: ApiCall.Failure })
  ),
  on(
    fromOrderActions.add,
    (state: State, { productId, quantity }): State => {
      const listId: number = state.lastEntityId + 1;

      return {
        ...state,
        entities: {
          ...state.entities,
          [listId]: { id: listId, productId, quantity, type: Type.Normal }
        },
        lastEntityId: listId
      };
    }
  ),
  on(
    fromOrderActions.chooseDelivery,
    (state: State, { productId }): State => {
      const listId: number = state.lastEntityId + 1;

      return {
        ...state,
        entities: {
          ...Object.keys(state.entities)
            .filter((key: string): boolean => [Type.Normal, Type.Payment].includes(state.entities[+key].type))
            .reduce((acc: any, curr: string): any => ((acc[curr] = state.entities[curr]), acc), {}),
          [listId]: { id: listId, productId, quantity: 1, type: Type.Delivery }
        },
        lastEntityId: listId
      };
    }
  ),
  on(
    fromOrderActions.choosePayment,
    (state: State, { productId }): State => {
      const listId: number = state.lastEntityId + 1;

      return {
        ...state,
        entities: {
          ...Object.keys(state.entities)
            .filter((key: string): boolean => [Type.Normal, Type.Delivery].includes(state.entities[+key].type))
            .reduce((acc: any, curr: string): any => ((acc[curr] = state.entities[curr]), acc), {}),
          [listId]: { id: listId, productId, quantity: 1, type: Type.Payment }
        },
        lastEntityId: listId
      };
    }
  ),
  on(
    fromOrderActions.quantityIncrement,
    (state: State, { id }): State => {
      const orderSimpleEntry: OrderSimpleEntry = state.entities[id];

      return orderSimpleEntry
        ? {
            ...state,
            entities: { ...state.entities, [id]: { ...orderSimpleEntry, quantity: orderSimpleEntry.quantity + 1 } }
          }
        : state;
    }
  ),
  on(
    fromOrderActions.quantityDecrement,
    (state: State, { id }): State => {
      const orderSimpleEntry: OrderSimpleEntry = state.entities[id];

      return orderSimpleEntry
        ? {
            ...state,
            entities: { ...state.entities, [id]: { ...orderSimpleEntry, quantity: orderSimpleEntry.quantity - 1 } }
          }
        : state;
    }
  ),
  on(
    fromOrderActions.quantitySetTo,
    (state: State, { id, quantity }): State => {
      const orderSimpleEntry: OrderSimpleEntry = state.entities[id];

      return orderSimpleEntry
        ? { ...state, entities: { ...state.entities, [id]: { ...orderSimpleEntry, quantity } } }
        : state;
    }
  ),
  on(
    fromOrderActions.remove,
    (state: State, { id }): State => {
      const { [id]: toDelete, ...rest } = state.entities;

      return toDelete ? { ...state, entities: rest } : state;
    }
  )
);

export function reducer(state: State | undefined, action: Action) {
  return orderReducer(state, action);
}
