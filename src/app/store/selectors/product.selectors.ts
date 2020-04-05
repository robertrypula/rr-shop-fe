import { createSelector } from '@ngrx/store';

import { ProductStore, Product } from '../../models/product.model';
import { selectActiveCategoryAndItsChildren, selectCategoryStoreAndItsChildren } from './category.selectors';
import { CategoryStore, StructuralNode } from '../../models/category.model';
import { selectUrl } from './router.selectors';
import { getProductId, isOnProductRoute } from '../../utils/routing.utils';
import { selectProductsStore } from './product-core.selectors';
import { selectOrderItemsStore } from './order-core.selectors';
import { getProductsStoreForGivenCategoriesStore, toProduct } from './product.utils';
import { selectCategoriesStore } from './category-core.selectors';
import { OrderItemStore } from '../../models/order-item.model';

export const selectUrlProductId = createSelector(selectUrl, (url: string): number => {
  return getProductId(url);
});

export const selectActiveProduct = createSelector(
  selectUrlProductId,
  selectProductsStore,
  selectOrderItemsStore,
  (urlProductId: number, productsStore: ProductStore[], orderItemsStore: OrderItemStore[]): Product => {
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
      (productStore: ProductStore): Product => toProduct(productStore, orderItemsStore)
    )
);

export const selectProductsFromCategoryByStructuralNode = (structuralNode: StructuralNode) =>
  createSelector(
    selectProductsStore,
    selectCategoriesStore,
    selectOrderItemsStore,
    (productsStore: ProductStore[], categoriesStore: CategoryStore[], orderItemsStore: OrderItemStore[]): Product[] => {
      const categoriesStoreByStructuralNode: CategoryStore[] = categoriesStore.filter(
        (category: CategoryStore): boolean => category.structuralNode === structuralNode
      );

      return getProductsStoreForGivenCategoriesStore(productsStore, categoriesStoreByStructuralNode).map(
        (productStore: ProductStore): Product => toProduct(productStore, orderItemsStore)
      );
    }
  );

export const selectProductsCountFromCategoryAndItsChildrenByCategoryId = createSelector(
  selectProductsStore,
  selectCategoryStoreAndItsChildren,
  (productsStore: ProductStore[], activeCategoryStoreAndItsChildren: CategoryStore[], props: { id: number }): number =>
    getProductsStoreForGivenCategoriesStore(productsStore, activeCategoryStoreAndItsChildren).length
);

export const selectIsOnProductRoute = createSelector(selectUrl, (url: string): boolean => isOnProductRoute(url));
