import { createSelector } from '@ngrx/store';

import { ApiCall } from '../../models/page.model';
import { isOnMainPageRoute } from '../../utils/routing.utils';

import { selectApiCallCategoriesAtInit } from './category-core.selectors';
import {
  selectApiCallCreateOrder,
  selectApiCallOrder,
  selectApiCallPotentialOrderProducts,
  selectApiCallPromoCode
} from './order-core.selectors';
import { selectApiCallProductsAtMainPage } from './page-core.selectors';
import {
  selectApiCallProduct,
  selectApiCallProductsAtCategory,
  selectApiCallProductsAtInit,
  selectApiCallProductsAtProduct
} from './product-core.selectors';
import { selectUrl } from './router.selectors';
import { selectApiCallSearch } from './search-core.selectors';

const selectIsLoadingOverlayVisibleFromOrderPerspective = createSelector(
  selectApiCallCreateOrder,
  selectApiCallOrder,
  (apiCallCreateOrder: ApiCall, apiCallOrder: ApiCall): boolean =>
    [ApiCall.Request].includes(apiCallCreateOrder) || [ApiCall.Request].includes(apiCallOrder)
);

const selectIsLoadingOverlayVisibleFromProductPerspective = createSelector(
  selectApiCallPotentialOrderProducts,
  selectApiCallProduct,
  selectApiCallProductsAtCategory,
  selectApiCallProductsAtInit,
  selectApiCallProductsAtMainPage,
  selectApiCallProductsAtProduct,
  (
    apiCallPotentialOrderProducts: ApiCall,
    apiCallProduct: ApiCall,
    apiCallProductsAtCategory: ApiCall,
    apiCallProductsAtInit: ApiCall,
    apiCallProductsAtMainPage: ApiCall,
    apiCallProductsAtProduct: ApiCall
  ): boolean =>
    [ApiCall.Initial, ApiCall.Request].includes(apiCallProductsAtInit) ||
    [ApiCall.Request].includes(apiCallPotentialOrderProducts) ||
    [ApiCall.Request].includes(apiCallProduct) ||
    [ApiCall.Request].includes(apiCallProductsAtCategory) ||
    [ApiCall.Request].includes(apiCallProductsAtMainPage) ||
    [ApiCall.Request].includes(apiCallProductsAtProduct)
);

export const selectIsLoadingOverlayVisible = createSelector(
  selectApiCallCategoriesAtInit,
  selectIsLoadingOverlayVisibleFromOrderPerspective,
  selectIsLoadingOverlayVisibleFromProductPerspective,
  selectApiCallPromoCode,
  selectApiCallSearch,
  (
    apiCallCategoriesAtInit: ApiCall,
    isLoadingOverlayVisibleFromOrderPerspective: boolean,
    isLoadingOverlayVisibleFromProductPerspective: boolean,
    apiCallPromoCode: ApiCall,
    apiCallSearch: ApiCall
  ): boolean =>
    [ApiCall.Initial, ApiCall.Request].includes(apiCallCategoriesAtInit) ||
    isLoadingOverlayVisibleFromOrderPerspective ||
    [ApiCall.Request].includes(apiCallPromoCode) ||
    isLoadingOverlayVisibleFromProductPerspective ||
    [ApiCall.Request].includes(apiCallSearch)
);

export const selectIsOnMainPageRoute = createSelector(selectUrl, (url: string): boolean => {
  return isOnMainPageRoute(url);
});
