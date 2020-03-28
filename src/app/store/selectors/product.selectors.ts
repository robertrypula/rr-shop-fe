import { createSelector } from '@ngrx/store';

import { ProductStore, ProductEnriched } from '../../models/product.model';
import { selectActiveCategoryAndItsChildren, selectCategoryStoreAndItsChildren } from './category.selectors';
import { CategoryStore, StructuralNode } from '../../models/category.model';
import { selectUrl } from './router.selectors';
import { getProductId, isOnProductRoute } from '../../utils/routing.utils';
import { selectProductsStoreAsArray, selectProductsStoreAsKeyValue } from './product-core.selectors';
import { selectOrderItemsStoreAsArray } from './order-core.selectors';
import { getProductsStoreForGivenCategoriesStore, toProductEnriched } from './product.utils';
import { selectCategoriesStoreAsArray } from './category-core.selectors';
import { OrderItemStore } from '../../models/order-item.model';

export const selectUrlProductId = createSelector(selectUrl, (url: string): number => {
  return getProductId(url);
});

export const selectActiveProductEnriched = createSelector(
  selectUrlProductId,
  selectProductsStoreAsKeyValue,
  selectOrderItemsStoreAsArray,
  (
    urlProductId: number,
    productsStoreAsKeyValue: { [key: string]: ProductStore },
    orderItemsStoreAsArray: OrderItemStore[]
  ): ProductEnriched => {
    return urlProductId
      ? toProductEnriched(productsStoreAsKeyValue[urlProductId], orderItemsStoreAsArray, productsStoreAsKeyValue)
      : null;
  }
);

export const selectProductsEnrichedFromActiveCategoryAndItsChildren = createSelector(
  selectProductsStoreAsArray,
  selectOrderItemsStoreAsArray,
  selectActiveCategoryAndItsChildren,
  (
    productsStoreAsArray: ProductStore[],
    orderItemsStoreAsArray: OrderItemStore[],
    activeCategoryAndItsChildren: CategoryStore[]
  ): ProductEnriched[] =>
    getProductsStoreForGivenCategoriesStore(productsStoreAsArray, activeCategoryAndItsChildren).map(
      (productStore: ProductStore): ProductEnriched => toProductEnriched(productStore, orderItemsStoreAsArray)
    )
);

export const selectProductsEnrichedFromCategoryByStructuralNode = (structuralNode: StructuralNode) =>
  createSelector(
    selectProductsStoreAsArray,
    selectCategoriesStoreAsArray,
    selectOrderItemsStoreAsArray,
    (
      productsStoreAsArray: ProductStore[],
      categoriesStoreAsArray: CategoryStore[],
      orderItemsStoreAsArray: OrderItemStore[]
    ): ProductEnriched[] => {
      const categoriesStoreByStructuralNode: CategoryStore[] = categoriesStoreAsArray.filter(
        (category: CategoryStore): boolean => category.structuralNode === structuralNode
      );

      return getProductsStoreForGivenCategoriesStore(productsStoreAsArray, categoriesStoreByStructuralNode).map(
        (productStore: ProductStore): ProductEnriched => toProductEnriched(productStore, orderItemsStoreAsArray)
      );
    }
  );

export const selectProductsCountFromCategoryAndItsChildrenByCategoryId = createSelector(
  selectProductsStoreAsArray,
  selectCategoryStoreAndItsChildren,
  (
    productsStoreAsArray: ProductStore[],
    activeCategoryStoreAndItsChildren: CategoryStore[],
    props: { id: number }
  ): number => getProductsStoreForGivenCategoriesStore(productsStoreAsArray, activeCategoryStoreAndItsChildren).length
);

export const selectIsOnProductRoute = createSelector(selectUrl, (url: string): boolean => isOnProductRoute(url));
