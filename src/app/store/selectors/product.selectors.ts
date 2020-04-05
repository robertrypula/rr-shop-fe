import { createSelector } from '@ngrx/store';

import { ProductStore, Product } from '../../models/product.model';
import { selectActiveCategoryAndItsChildren, selectCategoryStoreAndItsChildren } from './category.selectors';
import { CategoryStore, StructuralNode } from '../../models/category.model';
import { selectUrl } from './router.selectors';
import { getProductId, isOnProductRoute } from '../../utils/routing.utils';
import { selectProductsStoreAsArray } from './product-core.selectors';
import { selectOrderItemsStoreAsArray } from './order-core.selectors';
import { getProductsStoreForGivenCategoriesStore, toProduct } from './product.utils';
import { selectCategoriesStore } from './category-core.selectors';
import { OrderItemStore } from '../../models/order-item.model';

export const selectUrlProductId = createSelector(selectUrl, (url: string): number => {
  return getProductId(url);
});

export const selectActiveProduct = createSelector(
  selectUrlProductId,
  selectProductsStoreAsArray,
  selectOrderItemsStoreAsArray,
  (urlProductId: number, productsStoreAsArray: ProductStore[], orderItemsStoreAsArray: OrderItemStore[]): Product => {
    return urlProductId
      ? toProduct(
          productsStoreAsArray.find((productStore: ProductStore): boolean => productStore.id === urlProductId),
          orderItemsStoreAsArray,
          productsStoreAsArray
        )
      : null;
  }
);

export const selectProductsFromActiveCategoryAndItsChildren = createSelector(
  selectProductsStoreAsArray,
  selectOrderItemsStoreAsArray,
  selectActiveCategoryAndItsChildren,
  (
    productsStoreAsArray: ProductStore[],
    orderItemsStoreAsArray: OrderItemStore[],
    activeCategoryAndItsChildren: CategoryStore[]
  ): Product[] =>
    getProductsStoreForGivenCategoriesStore(productsStoreAsArray, activeCategoryAndItsChildren).map(
      (productStore: ProductStore): Product => toProduct(productStore, orderItemsStoreAsArray)
    )
);

export const selectProductsFromCategoryByStructuralNode = (structuralNode: StructuralNode) =>
  createSelector(
    selectProductsStoreAsArray,
    selectCategoriesStore,
    selectOrderItemsStoreAsArray,
    (
      productsStoreAsArray: ProductStore[],
      categoriesStore: CategoryStore[],
      orderItemsStoreAsArray: OrderItemStore[]
    ): Product[] => {
      const categoriesStoreByStructuralNode: CategoryStore[] = categoriesStore.filter(
        (category: CategoryStore): boolean => category.structuralNode === structuralNode
      );

      return getProductsStoreForGivenCategoriesStore(productsStoreAsArray, categoriesStoreByStructuralNode).map(
        (productStore: ProductStore): Product => toProduct(productStore, orderItemsStoreAsArray)
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
