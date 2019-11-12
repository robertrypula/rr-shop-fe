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
  )
);

export function reducer(state: State | undefined, action: Action) {
  return basketReducer(state, action);
}
