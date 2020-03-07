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
    1: { id: 1, productId: 7, quantity: 5, type: Type.Normal },
    2: { id: 2, productId: 10, quantity: 25, type: Type.Normal },
    3: { id: 3, productId: 5, quantity: 1, type: Type.Delivery },
    4: { id: 4, productId: 2, quantity: 1, type: Type.Payment }
  }
};

export let basketSimpleEntryId = 2; // TODO revert to 0 and remove initial basket entry from initialState

const basketReducer = createReducer(
  initialState,
  on(
    fromBasketActions.add,
    (state, { id, quantity }): State => {
      basketSimpleEntryId++;

      return {
        ...state,
        list: {
          ...state.list,
          [basketSimpleEntryId]: { id: basketSimpleEntryId, productId: id, quantity, type: Type.Normal }
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
