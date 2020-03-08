import { Action, createReducer, on } from '@ngrx/store';

import * as fromBasketActions from '../actions/basket.actions';
import { BasketSimpleEntry, Type } from '../../models/basket.model';

export interface State {
  list: {
    [id: number]: BasketSimpleEntry;
  };
}

export const initialState: State = {
  list: {
    // 1: { id: 1, productId: 7, quantity: 5, type: Type.Normal },
    // 2: { id: 2, productId: 10, quantity: 25, type: Type.Normal },
    // 3: { id: 3, productId: 3, quantity: 1, type: Type.Delivery }
  }
};

export let basketSimpleEntryId = 2; // TODO revert to 0 and remove initial basket entry from initialState

const basketReducer = createReducer(
  initialState,
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
