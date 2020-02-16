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
    images: [{ id: 1, name: 'propolis-front.jpg', order: 1 }],
    price: 14.99,
    quantity: 432,
    slug: 'propolis'
  },
  2: {
    categoryIds: [2, 10],
    description: '',
    id: 2,
    name: 'Balsam jerozolimski',
    images: [{ id: 2, name: 'balsam-jerozolimski-front.jpg', order: 1 }],
    price: 25.0,
    quantity: 32,
    slug: 'balsam-jerozolimski'
  },
  3: {
    categoryIds: [2, 11],
    description: '',
    id: 3,
    name: 'Krwiściąg',
    images: [
      { id: 3, name: 'krwisciag-3.jpg', order: 3 },
      { id: 4, name: 'krwisciag-front.jpg', order: 1 },
      { id: 5, name: 'krwisciag-2.jpg', order: 2 }
    ],
    price: 9.99,
    quantity: 3,
    slug: 'krwisciag'
  },
  4: {
    categoryIds: [2, 12],
    description: '',
    id: 4,
    name: 'Podbiał',
    images: [],
    price: 5.99,
    quantity: 30,
    slug: 'podbial'
  }
};

const productReducer = createReducer(initialState);

export function reducer(state: State | undefined, action: Action) {
  return productReducer(state, action);
}
