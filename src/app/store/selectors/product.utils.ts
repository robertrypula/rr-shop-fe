import { CategoryStore } from '../../models/category.model';
import { Image } from '../../models/image.model';
import { OrderItemStore } from '../../models/order-item.model';
import { Product, ProductStore } from '../../models/product.model';

import { toOrderItem } from './order.utils';

export const getProductsStoreForGivenCategoriesStore = (
  productsStore: ProductStore[],
  categoriesStore: CategoryStore[]
): ProductStore[] => {
  return categoriesStore.length
    ? productsStore.filter((product: ProductStore): boolean => {
        let match = false;

        for (let i = 0; i < categoriesStore.length; i++) {
          match = product.categoryIds.includes(categoriesStore[i].id);
          if (match) {
            break;
          }
        }

        return match;
      })
    : [];
};

export const toProduct = (
  productStore: ProductStore,
  orderItemsStore: OrderItemStore[],
  productsStore: ProductStore[] = null
): Product => {
  if (!productStore) {
    return null;
  }

  const foundOrderItemStore: OrderItemStore = orderItemsStore.find(
    (orderItemStore: OrderItemStore): boolean => orderItemStore.productId === productStore.id
  );

  return {
    ...productStore,
    images: productStore.images
      ? [...productStore.images].sort((a: Image, b: Image): number =>
          a.sortOrder === b.sortOrder ? 0 : a.sortOrder < b.sortOrder ? -1 : 1
        )
      : [],
    orderItem: foundOrderItemStore ? toOrderItem(foundOrderItemStore, productsStore) : null
  };
};
