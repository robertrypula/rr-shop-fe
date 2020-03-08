import { Action, createReducer, on } from '@ngrx/store';

import * as fromBasketActions from '../actions/basket.actions';
import { BasketSimpleEntry, Type } from '../../models/basket.model';
import { ApiCall } from '../../models/generic.model';

export interface State {
  apiCallPotentialOrder: ApiCall;
  list: {
    [id: number]: BasketSimpleEntry;
  };
}

export const initialState: State = {
  apiCallPotentialOrder: ApiCall.Initial,
  list: {}
};

export let basketSimpleEntryId = 0;

const basketReducer = createReducer(
  initialState,
  on(
    fromBasketActions.potentialOrderRequest,
    (state: State): State => ({ ...state, apiCallPotentialOrder: ApiCall.Request })
  ),
  on(
    fromBasketActions.potentialOrderSuccess,
    (state: State): State => ({ ...state, apiCallPotentialOrder: ApiCall.Success })
  ),
  on(
    fromBasketActions.potentialOrderFailure,
    (state: State): State => ({ ...state, apiCallPotentialOrder: ApiCall.Failure })
  ),
  on(
    fromBasketActions.add,
    (state, { productId, quantity }): State => {
      basketSimpleEntryId++;

      return {
        ...state,
        list: {
          ...state.list,
          [basketSimpleEntryId]: { id: basketSimpleEntryId, productId, quantity, type: Type.Normal }
        }
      };
    }
  ),
  on(
    fromBasketActions.chooseDelivery,
    (state, { productId }): State => {
      basketSimpleEntryId++;

      return {
        ...state,
        list: {
          ...Object.keys(state.list)
            .filter((key: string): boolean => [Type.Normal, Type.Payment].includes(state.list[+key].type))
            .reduce((acc: any, curr: string): any => ((acc[curr] = state.list[curr]), acc), {}),
          [basketSimpleEntryId]: { id: basketSimpleEntryId, productId, quantity: 1, type: Type.Delivery }
        }
      };
    }
  ),
  on(
    fromBasketActions.choosePayment,
    (state, { productId }): State => {
      basketSimpleEntryId++;

      return {
        ...state,
        list: {
          ...Object.keys(state.list)
            .filter((key: string): boolean => [Type.Normal, Type.Delivery].includes(state.list[+key].type))
            .reduce((acc: any, curr: string): any => ((acc[curr] = state.list[curr]), acc), {}),
          [basketSimpleEntryId]: { id: basketSimpleEntryId, productId, quantity: 1, type: Type.Payment }
        }
      };
    }
  ),
  on(
    fromBasketActions.quantityIncrement,
    (state: State, { id }): State => {
      const basketSimpleEntry: BasketSimpleEntry = state.list[id];

      return basketSimpleEntry
        ? {
            ...state,
            list: { ...state.list, [id]: { ...basketSimpleEntry, quantity: basketSimpleEntry.quantity + 1 } }
          }
        : state;
    }
  ),
  on(
    fromBasketActions.quantityDecrement,
    (state: State, { id }): State => {
      const basketSimpleEntry: BasketSimpleEntry = state.list[id];

      return basketSimpleEntry
        ? {
            ...state,
            list: { ...state.list, [id]: { ...basketSimpleEntry, quantity: basketSimpleEntry.quantity - 1 } }
          }
        : state;
    }
  ),
  on(
    fromBasketActions.quantitySetTo,
    (state: State, { id, quantity }): State => {
      const basketSimpleEntry: BasketSimpleEntry = state.list[id];

      return basketSimpleEntry
        ? { ...state, list: { ...state.list, [id]: { ...basketSimpleEntry, quantity } } }
        : state;
    }
  ),
  on(
    fromBasketActions.remove,
    (state: State, { id }): State => {
      const { [id]: toDelete, ...rest } = state.list;

      return toDelete ? { ...state, list: rest } : state;
    }
  )
);

export function reducer(state: State | undefined, action: Action) {
  return basketReducer(state, action);
}
