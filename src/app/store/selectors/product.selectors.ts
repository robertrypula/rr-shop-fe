import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import { Product } from '../../models/product.model';

export const selectProductFeature = (state: State) => state.product;

export const selectProducts = createSelector(
  selectProductFeature,
  (product): Product[] => Object.keys(product).map(key => product[key])
);
