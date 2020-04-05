import { createSelector } from '@ngrx/store';

import * as fromProductReducers from '../reducers/product.reducers';
import { ProductStore } from '../../models/product.model';
import { State } from '../reducers';
import { ApiCall } from '../../models/page.model';
import { getAsArray } from '../../utils/transfomation.utils';

export const selectProductFeature = (state: State): fromProductReducers.State => state.product;

export const selectProductsStoreAsArray = createSelector(
  selectProductFeature,
  (productFeature: fromProductReducers.State): ProductStore[] => getAsArray(productFeature.list)
);

export const selectProductsStoreLength = createSelector(
  selectProductsStoreAsArray,
  (productsStoreAsArray: ProductStore[]): number => {
    return productsStoreAsArray.length;
  }
);

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
