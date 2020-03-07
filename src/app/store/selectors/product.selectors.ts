import { createSelector } from '@ngrx/store';

import { Product, ProductEnriched } from '../../models/product.model';
import { selectActiveCategoryAndItsChildren, selectCategoryAndItsChildren } from './category.selectors';
import { Category } from '../../models/category.model';
import { selectUrl } from './router.selectors';
import { getProductId, isOnProductRoute } from '../../utils/routing.util';
import { BasketSimpleEntry } from '../../models/basket.model';
import { selectProductsAsArray, selectProductsAsKeyValue } from './product-core.selectors';
import { selectBasketSimpleEntriesAsArray } from './basket-core.selectors';
import { getProductsForGivenCategories, toProductEnriched } from './product.utils';

export const selectActiveProductId = createSelector(selectUrl, (url: string): number => {
  return getProductId(url);
});

export const selectActiveProduct = createSelector(
  selectActiveProductId,
  selectProductsAsKeyValue,
  (activeProductId: number, productsAsKeyValue: { [key: string]: Product }): Product => {
    return activeProductId ? productsAsKeyValue[activeProductId] : null;
  }
);

export const selectProductsEnrichedFromActiveCategoryAndItsChildren = createSelector(
  selectProductsAsArray,
  selectBasketSimpleEntriesAsArray,
  selectActiveCategoryAndItsChildren,
  (
    productsAsArray: Product[],
    basketSimpleEntriesAsArray: BasketSimpleEntry[],
    activeCategoryAndItsChildren: Category[]
  ): ProductEnriched[] =>
    getProductsForGivenCategories(productsAsArray, activeCategoryAndItsChildren).map(
      (product: Product): ProductEnriched => toProductEnriched(product, basketSimpleEntriesAsArray)
    )
);

export const selectProductsCountFromCategoryAndItsChildrenByCategoryId = createSelector(
  selectProductsAsArray,
  selectCategoryAndItsChildren,
  (productsAsArray: Product[], activeCategoryAndItsChildren: Category[], props: { id: number }): number =>
    getProductsForGivenCategories(productsAsArray, activeCategoryAndItsChildren).length
);

export const selectIsOnProductRoute = createSelector(selectUrl, (url: string): boolean => isOnProductRoute(url));
