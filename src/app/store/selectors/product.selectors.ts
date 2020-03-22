import { createSelector } from '@ngrx/store';

import { Product, ProductEnriched } from '../../models/product.model';
import { selectActiveCategoryAndItsChildren, selectCategoryAndItsChildren } from './category.selectors';
import { CategoryStore, StructuralNode } from '../../models/category.model';
import { selectUrl } from './router.selectors';
import { getProductId, isOnProductRoute } from '../../utils/routing.utils';
import { selectProductsAsArray, selectProductsAsKeyValue } from './product-core.selectors';
import { selectOrderItemsStoreAsArray } from './order-core.selectors';
import { getProductsForGivenCategories, toProductEnriched } from './product.utils';
import { selectCategoriesAsArray } from './category-core.selectors';
import { OrderItemStore } from '../../models/order-item.model';

export const selectUrlProductId = createSelector(selectUrl, (url: string): number => {
  return getProductId(url);
});

export const selectActiveProductEnriched = createSelector(
  selectUrlProductId,
  selectProductsAsKeyValue,
  selectOrderItemsStoreAsArray,
  (
    urlProductId: number,
    productsAsKeyValue: { [key: string]: Product },
    orderItemsStoreAsArray: OrderItemStore[]
  ): ProductEnriched => {
    return urlProductId ? toProductEnriched(productsAsKeyValue[urlProductId], orderItemsStoreAsArray) : null;
  }
);

export const selectProductsEnrichedFromActiveCategoryAndItsChildren = createSelector(
  selectProductsAsArray,
  selectOrderItemsStoreAsArray,
  selectActiveCategoryAndItsChildren,
  (
    productsAsArray: Product[],
    orderItemsStoreAsArray: OrderItemStore[],
    activeCategoryAndItsChildren: CategoryStore[]
  ): ProductEnriched[] =>
    getProductsForGivenCategories(productsAsArray, activeCategoryAndItsChildren).map(
      (product: Product): ProductEnriched => toProductEnriched(product, orderItemsStoreAsArray)
    )
);

export const selectProductsEnrichedFromCategoryByStructuralNode = (structuralNode: StructuralNode) =>
  createSelector(
    selectProductsAsArray,
    selectCategoriesAsArray,
    selectOrderItemsStoreAsArray,
    (
      productsAsArray: Product[],
      categoriesAsArray: CategoryStore[],
      orderItemsStoreAsArray: OrderItemStore[]
    ): ProductEnriched[] => {
      const categoriesByStructuralNode: CategoryStore[] = categoriesAsArray.filter(
        (category: CategoryStore): boolean => category.structuralNode === structuralNode
      );

      return getProductsForGivenCategories(productsAsArray, categoriesByStructuralNode).map(
        (product: Product): ProductEnriched => toProductEnriched(product, orderItemsStoreAsArray)
      );
    }
  );

export const selectProductsCountFromCategoryAndItsChildrenByCategoryId = createSelector(
  selectProductsAsArray,
  selectCategoryAndItsChildren,
  (productsAsArray: Product[], activeCategoryAndItsChildren: CategoryStore[], props: { id: number }): number =>
    getProductsForGivenCategories(productsAsArray, activeCategoryAndItsChildren).length
);

export const selectIsOnProductRoute = createSelector(selectUrl, (url: string): boolean => isOnProductRoute(url));
