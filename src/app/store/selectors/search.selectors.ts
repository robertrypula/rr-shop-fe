import { createSelector } from '@ngrx/store';

import { OrderItemStore } from '../../models/order-item.model';
import { Product, ProductStore } from '../../models/product.model';
import { isOnSearchRoute } from '../../utils/routing.utils';

import { selectOrderItemsStore } from './order-core.selectors';
import { selectProductsStore } from './product-core.selectors';
import { toProduct } from './product.utils';
import { selectUrl } from './router.selectors';
import { selectFoundProductIds } from './search-core.selectors';

export const selectIsOnSearchRoute = createSelector(selectUrl, (url: string): boolean => {
  return isOnSearchRoute(url);
});

export const selectProductsByQuery = createSelector(
  selectProductsStore,
  selectOrderItemsStore,
  selectFoundProductIds,
  (productsStore: ProductStore[], orderItemsStore: OrderItemStore[], foundProductIds: number[]): Product[] => {
    const foundProductsStore: ProductStore[] = [];

    for (let i = 0; i < foundProductIds.length; i++) {
      const foundProductStore: ProductStore = productsStore.find(
        (productStore: ProductStore): boolean => productStore.id === foundProductIds[i]
      );

      if (foundProductStore) {
        foundProductsStore.push(foundProductStore);
      }
    }

    return foundProductsStore.map(
      (productStore: ProductStore): Product => toProduct(productStore, orderItemsStore, productsStore)
    );
  }
);
