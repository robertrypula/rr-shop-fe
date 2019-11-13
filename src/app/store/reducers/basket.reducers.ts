import { Action, createReducer, on } from '@ngrx/store';

import * as fromBasketActions from '../actions/basket.actions';
import { BasketSimpleEntry } from '../../models/basket.model';

export interface State {
  [id: number]: BasketSimpleEntry;
}

export const initialState: State = {};

export let basketSimpleEntryId = 0;

const basketReducer = createReducer(
  initialState,
  on(
    fromBasketActions.add,
    (state, { id, quantity }): State => {
      basketSimpleEntryId++;

      return { ...state, [basketSimpleEntryId]: { id: basketSimpleEntryId, productId: id, quantity } };
    }
  ),
  on(
    fromBasketActions.quantityIncrement,
    (state: State, { id }): State => {
      const basketSimpleEntry = state[id];

      return basketSimpleEntry
        ? { ...state, [id]: { ...basketSimpleEntry, quantity: basketSimpleEntry.quantity + 1 } }
        : state;
    }
  ),
  on(
    fromBasketActions.quantityDecrement,
    (state: State, { id }): State => {
      const basketSimpleEntry = state[id];

      return basketSimpleEntry
        ? { ...state, [id]: { ...basketSimpleEntry, quantity: basketSimpleEntry.quantity - 1 } }
        : state;
    }
  ),
  on(
    fromBasketActions.quantitySetTo,
    (state: State, { id, quantity }): State => {
      const basketSimpleEntry = state[id];

      return basketSimpleEntry ? { ...state, [id]: { ...basketSimpleEntry, quantity } } : state;
    }
  ),
  on(
    fromBasketActions.remove,
    (state: State, { id }): State => {
      const { [id]: toDelete, ...rest } = state;

      return toDelete ? rest : state;
    }
  )
);

export function reducer(state: State | undefined, action: Action) {
  return basketReducer(state, action);
}
