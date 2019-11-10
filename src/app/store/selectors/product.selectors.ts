import * as fromIndex from '../reducers';
import { createSelector } from '@ngrx/store';
import { Product } from '../../models/product.model';

export const selectProduct = (state: fromIndex.State) => state.product;

export const selectProducts = createSelector(
  selectProduct,
  (product): Product[] => Object.keys(product).map(key => product[key])
);
