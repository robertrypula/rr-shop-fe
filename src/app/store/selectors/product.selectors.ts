import { createSelector } from '@ngrx/store';

import { Product, ProductEnriched } from '../../models/product.model';
import { selectActiveCategoryAndItsChildren, selectCategoryAndItsChildren } from './category.selectors';
import { Category, StructuralNode } from '../../models/category.model';
import { selectUrl } from './router.selectors';
import { getProductId, isOnProductRoute } from '../../utils/routing.util';
import { BasketSimpleEntry } from '../../models/basket.model';
import { selectProductsAsArray, selectProductsAsKeyValue } from './product-core.selectors';
import { selectBasketSimpleEntriesAsArray } from './basket-core.selectors';
import { getProductsForGivenCategories, toProductEnriched } from './product.utils';
import { selectCategoriesAsArray } from './category-core.selectors';

export const selectUrlProductId = createSelector(selectUrl, (url: string): number => {
  return getProductId(url);
});

export const selectActiveProductEnriched = createSelector(
  selectUrlProductId,
  selectProductsAsKeyValue,
  selectBasketSimpleEntriesAsArray,
  (
    urlProductId: number,
    productsAsKeyValue: { [key: string]: Product },
    basketSimpleEntriesAsArray: BasketSimpleEntry[]
  ): ProductEnriched => {
    return urlProductId ? toProductEnriched(productsAsKeyValue[urlProductId], basketSimpleEntriesAsArray) : null;
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

export const selectProductsEnrichedFromCategoryByStructuralNode = (structuralNode: StructuralNode) =>
  createSelector(
    selectProductsAsArray,
    selectCategoriesAsArray,
    selectBasketSimpleEntriesAsArray,
    (
      productsAsArray: Product[],
      categoriesAsArray: Category[],
      basketSimpleEntriesAsArray: BasketSimpleEntry[]
    ): ProductEnriched[] => {
      const categoriesByStructuralNode: Category[] = categoriesAsArray.filter(
        (category: Category): boolean => category.structuralNode === structuralNode
      );

      return getProductsForGivenCategories(productsAsArray, categoriesByStructuralNode).map(
        (product: Product): ProductEnriched => toProductEnriched(product, basketSimpleEntriesAsArray)
      );
    }
  );

export const selectProductsCountFromCategoryAndItsChildrenByCategoryId = createSelector(
  selectProductsAsArray,
  selectCategoryAndItsChildren,
  (productsAsArray: Product[], activeCategoryAndItsChildren: Category[], props: { id: number }): number =>
    getProductsForGivenCategories(productsAsArray, activeCategoryAndItsChildren).length
);

export const selectIsOnProductRoute = createSelector(selectUrl, (url: string): boolean => isOnProductRoute(url));
