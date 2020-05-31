import { createSelector } from '@ngrx/store';

import { ApiCall } from '../../models/page.model';
import { ProductStore } from '../../models/product.model';
import * as fromProductReducers from '../reducers/product.reducers';
import { State } from '../reducers';
import { getAsArray } from '../../utils/transfomation.utils';

export const selectProductFeature = (state: State): fromProductReducers.State => state.product;

export const selectProductsStore = createSelector(
  selectProductFeature,
  (productFeature: fromProductReducers.State): ProductStore[] => getAsArray(productFeature.list)
);

export const selectProductsStoreLength = createSelector(
  selectProductsStore,
  (productsStore: ProductStore[]): number => {
    return productsStore.length;
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

export const selectApiCallProductsAtProduct = createSelector(
  selectProductFeature,
  (productFeature: fromProductReducers.State): ApiCall => productFeature.apiCallProductsAtProduct
);
