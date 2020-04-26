import { createSelector } from '@ngrx/store';

import { CategoryStore, StructuralNode } from '../../models/category.model';
import { OrderItemStore } from '../../models/order-item.model';
import { Product, ProductStore } from '../../models/product.model';
import { getProductId, isOnProductRoute } from '../../utils/routing.utils';

import { selectCategoriesStore } from './category-core.selectors';
import { selectActiveCategoryAndItsChildren, selectCategoryStoreAndItsChildren } from './category.selectors';
import { selectOrderItemsStore } from './order-core.selectors';
import { selectProductsStore } from './product-core.selectors';
import { getProductsStoreForGivenCategoriesStore, toProduct } from './product.utils';
import { selectUrl } from './router.selectors';

export const selectUrlProductId = createSelector(selectUrl, (url: string): number => {
  return getProductId(url);
});

export const selectActiveProduct = createSelector(
  selectProductsStore,
  selectOrderItemsStore,
  selectUrlProductId,
  (productsStore: ProductStore[], orderItemsStore: OrderItemStore[], urlProductId: number): Product => {
    return urlProductId
      ? toProduct(
          productsStore.find((productStore: ProductStore): boolean => productStore.id === urlProductId),
          orderItemsStore,
          productsStore
        )
      : null;
  }
);

export const selectProductsFromActiveCategoryAndItsChildren = createSelector(
  selectProductsStore,
  selectOrderItemsStore,
  selectActiveCategoryAndItsChildren,
  (
    productsStore: ProductStore[],
    orderItemsStore: OrderItemStore[],
    activeCategoryAndItsChildren: CategoryStore[]
  ): Product[] =>
    getProductsStoreForGivenCategoriesStore(productsStore, activeCategoryAndItsChildren).map(
      (productStore: ProductStore): Product => toProduct(productStore, orderItemsStore, productsStore)
    )
);

export const selectProductsFromCategoryByStructuralNode = (structuralNode: StructuralNode, limit = Infinity) =>
  createSelector(
    selectProductsStore,
    selectOrderItemsStore,
    selectCategoriesStore,
    (productsStore: ProductStore[], orderItemsStore: OrderItemStore[], categoriesStore: CategoryStore[]): Product[] => {
      const categoriesStoreByStructuralNode: CategoryStore[] = categoriesStore.filter(
        (category: CategoryStore): boolean => category.structuralNode === structuralNode
      );
      let productsStoreForGivenCategories: ProductStore[] = getProductsStoreForGivenCategoriesStore(
        productsStore,
        categoriesStoreByStructuralNode
      );

      if (limit !== Infinity) {
        productsStoreForGivenCategories = productsStoreForGivenCategories.slice(0, limit);
      }

      return productsStoreForGivenCategories.map(
        (productStore: ProductStore): Product => toProduct(productStore, orderItemsStore, productsStore)
      );
    }
  );

// TODO refactor categories (use class approach with relations to products) and remove this selector
// TODO as category object itself will be able to calculate this number by traversing the tree
export const selectProductsCountFromCategoryAndItsChildrenByCategoryId = createSelector(
  selectProductsStore,
  selectCategoryStoreAndItsChildren,
  (
    productsStore: ProductStore[],
    activeCategoryStoreAndItsChildren: CategoryStore[],
    props: { categoryId: number }
  ): number => getProductsStoreForGivenCategoriesStore(productsStore, activeCategoryStoreAndItsChildren).length
);

export const selectIsOnProductRoute = createSelector(selectUrl, (url: string): boolean => isOnProductRoute(url));
