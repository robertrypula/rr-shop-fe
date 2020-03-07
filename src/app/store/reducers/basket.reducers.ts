import { Action, createReducer, on } from '@ngrx/store';

import * as fromBasketActions from '../actions/basket.actions';
import { BasketSimpleEntry } from '../../models/basket.model';

export interface State {
  list: {
    [id: number]: BasketSimpleEntry;
  };
}

export const initialState: State = {
  list: {
    /*
    1: {
      id: 1,
      productId: 1,
      quantity: 1
    }
    */
  }
};

export let basketSimpleEntryId = 0; // 1; // TODO revert to 0 and remove initial basket entry from initialState

const basketReducer = createReducer(
  initialState,
  on(
    fromBasketActions.add,
    (state, { id, quantity }): State => {
      basketSimpleEntryId++;

      return {
        ...state,
        list: { ...state.list, [basketSimpleEntryId]: { id: basketSimpleEntryId, productId: id, quantity } }
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

      return basketSimpleEntry && basketSimpleEntry.quantity > 1
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
