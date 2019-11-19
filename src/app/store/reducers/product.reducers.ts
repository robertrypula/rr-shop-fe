import { Action, createReducer } from '@ngrx/store';

import { Product } from '../../models/product.model';

export interface State {
  [id: number]: Product;
}

export const initialState: State = {
  1: {
    categoryIds: [2],
    description: '',
    id: 1,
    name: 'Propolis',
    price: 14.99,
    quantity: 432
  },
  2: {
    categoryIds: [2],
    description: '',
    id: 2,
    name: 'Balsam jerozolimski',
    price: 25.0,
    quantity: 32
  },
  3: {
    categoryIds: [2, 10],
    description: '',
    id: 3,
    name: 'Krwiściąg',
    price: 9.99,
    quantity: 3
  },
  4: {
    categoryIds: [2, 10],
    description: '',
    id: 4,
    name: 'Podbiał',
    price: 5.99,
    quantity: 30
  }
};

const productReducer = createReducer(initialState);

export function reducer(state: State | undefined, action: Action) {
  return productReducer(state, action);
}
