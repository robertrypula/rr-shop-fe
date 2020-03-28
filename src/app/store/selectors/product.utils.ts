import { ProductStore, ProductEnriched } from '../../models/product.model';
import { CategoryStore } from '../../models/category.model';
import { toOrderItem } from './order.utils';
import { Image } from '../../models/image.model';
import { OrderItemStore } from '../../models/order-item.model';

export const getProductsStoreForGivenCategoriesStore = (
  productsStoreAsArray: ProductStore[],
  categoriesStore: CategoryStore[]
): ProductStore[] => {
  return categoriesStore.length
    ? productsStoreAsArray.filter((product: ProductStore): boolean => {
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

export const toProductEnriched = (
  productStore: ProductStore,
  orderItemsStoreAsArray: OrderItemStore[],
  productsStoreAsKeyValue: { [id: number]: ProductStore } = null
): ProductEnriched => {
  if (!productStore) {
    return null;
  }

  const orderItemStoreFound: OrderItemStore = orderItemsStoreAsArray.find(
    (orderItemStore: OrderItemStore): boolean => orderItemStore.productId === productStore.id
  );

  return {
    ...productStore,
    images: productStore.images
      ? [...productStore.images].sort((a: Image, b: Image): number =>
          a.sortOrder === b.sortOrder ? 0 : a.sortOrder < b.sortOrder ? -1 : 1
        )
      : [],
    orderItem: orderItemStoreFound ? toOrderItem(orderItemStoreFound, productsStoreAsKeyValue) : null
  };
};
