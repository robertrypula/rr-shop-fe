import { createSelector } from '@ngrx/store';

import { ApiCall } from '../../models/generic.model';
import {
  selectApiCallProduct,
  selectApiCallProductsAtCategory,
  selectApiCallProductsAtInit
} from './product-core.selectors';
import { selectApiCallCategoriesAtInit } from './category-core.selectors';
import { selectApiCallPotentialOrder } from './basket-core.selectors';

export const selectIsLoadingOverlayVisible = createSelector(
  selectApiCallCategoriesAtInit,
  selectApiCallPotentialOrder,
  selectApiCallProduct,
  selectApiCallProductsAtCategory,
  selectApiCallProductsAtInit,
  (
    apiCallCategoriesAtInit: ApiCall,
    apiCallPotentialOrder: ApiCall,
    apiCallProduct: ApiCall,
    apiCallProductsAtCategory: ApiCall,
    apiCallProductsAtInit: ApiCall
  ): boolean =>
    [ApiCall.Initial, ApiCall.Request].includes(apiCallCategoriesAtInit) ||
    [ApiCall.Request].includes(apiCallPotentialOrder) ||
    [ApiCall.Request].includes(apiCallProduct) ||
    [ApiCall.Request].includes(apiCallProductsAtCategory) ||
    [ApiCall.Initial, ApiCall.Request].includes(apiCallProductsAtInit)
);
