import { Product, ProductEnriched } from '../../models/product.model';
import { CategoryStore } from '../../models/category.model';
import { toOrderItem } from './order.utils';
import { Image } from '../../models/image.model';
import { OrderItemStore } from '../../models/order-item.model';

export const getProductsAsArray = (productsAsKeyValue: { [id: number]: Product }): Product[] => {
  return Object.keys(productsAsKeyValue).map((key: string): Product => productsAsKeyValue[+key]);
};

export const getProductsForGivenCategories = (productsAsArray: Product[], categories: CategoryStore[]): Product[] => {
  return categories.length
    ? productsAsArray.filter((product: Product): boolean => {
        let match = false;

        for (let i = 0; i < categories.length; i++) {
          match = product.categoryIds.includes(categories[i].id);
          if (match) {
            break;
          }
        }

        return match;
      })
    : [];
};

export const toProductEnriched = (product: Product, orderItemsStoreAsArray: OrderItemStore[]): ProductEnriched => {
  if (!product) {
    return null;
  }

  const orderItemStoreFound: OrderItemStore = orderItemsStoreAsArray.find(
    (orderItemStore: OrderItemStore): boolean => orderItemStore.productId === product.id
  );

  return {
    ...product,
    images: product.images
      ? [...product.images].sort((a: Image, b: Image): number => (a.order === b.order ? 0 : a.order < b.order ? -1 : 1))
      : [],
    orderItem: orderItemStoreFound ? toOrderItem(orderItemStoreFound) : null
  };
};
