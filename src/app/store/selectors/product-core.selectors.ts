import { createSelector } from '@ngrx/store';

import * as fromProductReducers from '../reducers/product.reducers';
import { Product } from '../../models/product.model';
import { State } from '../reducers';
import { ApiCall } from '../../models/generic.model';
import { getProductsAsArray } from './product.utils';

export const selectProductFeature = (state: State): fromProductReducers.State => state.product;

export const selectProductsAsArray = createSelector(
  selectProductFeature,
  (productFeature: fromProductReducers.State): Product[] => getProductsAsArray(productFeature.list)
);

export const selectProductsAsKeyValue = createSelector(
  selectProductFeature,
  (productFeature: fromProductReducers.State): { [id: number]: Product } => productFeature.list
);

export const selectProductsLength = createSelector(selectProductsAsArray, (productsAsArray: Product[]): number => {
  return productsAsArray.length;
});

export const selectApiCallProduct = createSelector(
  selectProductFeature,
  (productFeature: fromProductReducers.State): ApiCall => productFeature.apiCallProduct
);

export const selectApiCallProductsAtCategory = createSelector(
  selectProductFeature,
  (productFeature: fromProductReducers.State): ApiCall => productFeature.apiCallProductsAtCategory
);

export const selectApiCallProductsAtInit = createSelector(
  selectProductFeature,
  (productFeature: fromProductReducers.State): ApiCall => productFeature.apiCallProductsAtInit
);
