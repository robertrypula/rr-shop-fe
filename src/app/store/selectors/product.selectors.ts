import { createSelector } from '@ngrx/store';

import { CategoryStore, StructuralNode } from '../../models/category.model';
import { OrderItemStore } from '../../models/order-item.model';
import { Product, ProductSortBy, ProductStore } from '../../models/product.model';
import { getProductId, isOnProductRoute } from '../../utils/routing.utils';

import { selectCategoriesStore } from './category-core.selectors';
import {
  selectActiveCategoryProductSortBy,
  selectActiveCategoryStoreAndItsChildren,
  selectCategoryStoreAndItsChildren
} from './category.selectors';
import { selectOrderItemsStore } from './order-core.selectors';
import { selectProductsStore } from './product-core.selectors';
import {
  getProductsForGivenCategoriesStore,
  getProductsStoreForGivenCategoriesStore,
  toProduct
} from './product.utils';
import { selectUrl } from './router.selectors';

const sortByName = (a: Product, b: Product): number => {
  return a.name === b.name ? 0 : a.name > b.name ? 1 : -1;
};

const sortByPrice = (a: Product, b: Product): number => {
  return a.priceUnit === b.priceUnit ? 0 : a.priceUnit < b.priceUnit ? -1 : 1;
};

export const selectUrlProductId = createSelector(selectUrl, (url: string): number => {
  return getProductId(url);
});

const selectActiveProductStore = createSelector(
  selectProductsStore,
  selectUrlProductId,
  (productsStore: ProductStore[], urlProductId: number): ProductStore => {
    return urlProductId
      ? productsStore.find((productStore: ProductStore): boolean => productStore.id === urlProductId)
      : null;
  }
);

export const selectActiveProduct = createSelector(
  selectActiveProductStore,
  selectProductsStore,
  selectOrderItemsStore,
  selectCategoriesStore,
  (
    activeProductStore: ProductStore,
    productsStore: ProductStore[],
    orderItemsStore: OrderItemStore[],
    categoriesStore: CategoryStore[]
  ): Product => {
    return activeProductStore ? toProduct(activeProductStore, orderItemsStore, productsStore, categoriesStore) : null;
  }
);

export const selectProductsFromActiveCategoryAndItsChildren = createSelector(
  selectProductsStore,
  selectOrderItemsStore,
  selectActiveCategoryStoreAndItsChildren,
  selectActiveCategoryProductSortBy,
  (
    productsStore: ProductStore[],
    orderItemsStore: OrderItemStore[],
    activeCategoryAndItsChildren: CategoryStore[],
    activeCategoryProductSortBy: ProductSortBy
  ): Product[] => {
    const products: Product[] = getProductsStoreForGivenCategoriesStore(
      productsStore,
      activeCategoryAndItsChildren
    ).map((productStore: ProductStore): Product => toProduct(productStore, orderItemsStore, productsStore));

    switch (activeCategoryProductSortBy) {
      case ProductSortBy.NameAscending:
        products.sort(sortByName);
        break;
      case ProductSortBy.NameDescending:
        products.sort(sortByName).reverse();
        break;
      case ProductSortBy.PriceAscending:
        products.sort(sortByPrice);
        break;
      case ProductSortBy.PriceDescending:
        products.sort(sortByPrice).reverse();
        break;
    }

    return products;
  }
);

export const selectProductsFromCategoryByCategoryId = (
  categoryId: number,
  limit = Infinity,
  productIdToExclude: number = null
) =>
  createSelector(
    selectProductsStore,
    selectOrderItemsStore,
    selectCategoriesStore,
    (productsStore: ProductStore[], orderItemsStore: OrderItemStore[], categoriesStore: CategoryStore[]): Product[] => {
      return getProductsForGivenCategoriesStore(
        productsStore,
        orderItemsStore,
        categoriesStore.filter((category: CategoryStore): boolean => category.id === categoryId),
        limit,
        productIdToExclude
      );
    }
  );

export const selectProductsFromCategoryByStructuralNode = (structuralNode: StructuralNode, limit = Infinity) =>
  createSelector(
    selectProductsStore,
    selectOrderItemsStore,
    selectCategoriesStore,
    (productsStore: ProductStore[], orderItemsStore: OrderItemStore[], categoriesStore: CategoryStore[]): Product[] => {
      return getProductsForGivenCategoriesStore(
        productsStore,
        orderItemsStore,
        categoriesStore.filter((category: CategoryStore): boolean => category.structuralNode === structuralNode),
        limit
      );
    }
  );

export const selectProductsFromCategoryLengthByCategoryId = (categoryId: number, productIdToExclude: number = null) =>
  createSelector(
    selectProductsStore,
    selectCategoriesStore,
    (productsStore: ProductStore[], categoriesStore: CategoryStore[]): number => {
      return getProductsStoreForGivenCategoriesStore(
        productsStore,
        categoriesStore.filter((category: CategoryStore): boolean => category.id === categoryId),
        productIdToExclude
      ).length;
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
