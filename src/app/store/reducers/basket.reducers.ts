import { Action, createReducer, on } from '@ngrx/store';

import * as fromBasketActions from '../actions/basket.actions';
import { BasketSimpleEntry, Type } from '../../models/basket.model';
import { ApiCall } from '../../models/generic.model';

export interface State {
  apiCallCreateOrder: ApiCall;
  apiCallOrder: ApiCall;
  apiCallPotentialOrderProducts: ApiCall;
  entities: {
    [id: number]: BasketSimpleEntry;
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

const basketReducer = createReducer(
  initialState,
  on(
    fromBasketActions.createOrderRequest,
    (state: State): State => ({ ...state, apiCallCreateOrder: ApiCall.Request })
  ),
  on(
    fromBasketActions.createOrderSuccess,
    (state: State): State => ({ ...state, apiCallCreateOrder: ApiCall.Success })
  ),
  on(
    fromBasketActions.createOrderFailure,
    (state: State): State => ({ ...state, apiCallCreateOrder: ApiCall.Failure })
  ),
  on(fromBasketActions.orderRequest, (state: State): State => ({ ...state, apiCallOrder: ApiCall.Request })),
  on(fromBasketActions.orderSuccess, (state: State): State => ({ ...state, apiCallOrder: ApiCall.Success })),
  on(fromBasketActions.orderFailure, (state: State): State => ({ ...state, apiCallOrder: ApiCall.Failure })),
  on(
    fromBasketActions.potentialOrderProductsRequest,
    (state: State): State => ({ ...state, apiCallPotentialOrderProducts: ApiCall.Request })
  ),
  on(
    fromBasketActions.potentialOrderProductsSuccess,
    (state: State): State => ({ ...state, apiCallPotentialOrderProducts: ApiCall.Success })
  ),
  on(
    fromBasketActions.potentialOrderProductsFailure,
    (state: State): State => ({ ...state, apiCallPotentialOrderProducts: ApiCall.Failure })
  ),
  on(
    fromBasketActions.add,
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
    fromBasketActions.chooseDelivery,
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
    fromBasketActions.choosePayment,
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
    fromBasketActions.quantityIncrement,
    (state: State, { id }): State => {
      const basketSimpleEntry: BasketSimpleEntry = state.entities[id];

      return basketSimpleEntry
        ? {
            ...state,
            entities: { ...state.entities, [id]: { ...basketSimpleEntry, quantity: basketSimpleEntry.quantity + 1 } }
          }
        : state;
    }
  ),
  on(
    fromBasketActions.quantityDecrement,
    (state: State, { id }): State => {
      const basketSimpleEntry: BasketSimpleEntry = state.entities[id];

      return basketSimpleEntry
        ? {
            ...state,
            entities: { ...state.entities, [id]: { ...basketSimpleEntry, quantity: basketSimpleEntry.quantity - 1 } }
          }
        : state;
    }
  ),
  on(
    fromBasketActions.quantitySetTo,
    (state: State, { id, quantity }): State => {
      const basketSimpleEntry: BasketSimpleEntry = state.entities[id];

      return basketSimpleEntry
        ? { ...state, entities: { ...state.entities, [id]: { ...basketSimpleEntry, quantity } } }
        : state;
    }
  ),
  on(
    fromBasketActions.remove,
    (state: State, { id }): State => {
      const { [id]: toDelete, ...rest } = state.entities;

      return toDelete ? { ...state, entities: rest } : state;
    }
  )
);

export function reducer(state: State | undefined, action: Action) {
  return basketReducer(state, action);
}
