import { createSelector } from '@ngrx/store';

import { selectApiCallCategoriesAtInit } from './category.selectors';
import { ApiCall } from '../../models/generic.model';
import { selectApiCallProductsAtCategory, selectApiCallProductsAtInit } from './product.selectors';

export const selectIsLoadingOverlayVisible = createSelector(
  selectApiCallCategoriesAtInit,
  selectApiCallProductsAtCategory,
  selectApiCallProductsAtInit,
  (apiCallCategoriesAtInit: ApiCall, apiCallProductsAtCategory: ApiCall, apiCallProductsAtInit: ApiCall): boolean =>
    [ApiCall.Initial, ApiCall.Request].includes(apiCallCategoriesAtInit) ||
    [ApiCall.Request].includes(apiCallProductsAtCategory) ||
    [ApiCall.Initial, ApiCall.Request].includes(apiCallProductsAtInit)
);
