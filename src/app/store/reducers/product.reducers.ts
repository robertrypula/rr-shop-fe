import { Action, createReducer } from '@ngrx/store';

import { Product } from '../../models/product.model';

export interface State {
  [id: number]: Product;
}

export const initialState: State = {
  1: {
    description: '',
    id: 1,
    name: 'Propolis',
    quantity: 432
  },
  2: {
    description: '',
    id: 2,
    name: 'Balsam jerozolimski',
    quantity: 32
  },
  3: {
    description: '',
    id: 3,
    name: 'Krwiściąg',
    quantity: 3
  }
};

const productReducer = createReducer(initialState);

export function reducer(state: State | undefined, action: Action) {
  return productReducer(state, action);
}
