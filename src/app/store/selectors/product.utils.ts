import { Product, ProductEnriched } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { OrderSimpleEntry } from '../../models/order.model';
import { toOrderEntry } from './order.utils';
import { Image } from '../../models/image.model';

export const getProductsAsArray = (productsAsKeyValue: { [id: number]: Product }): Product[] => {
  return Object.keys(productsAsKeyValue).map((key: string): Product => productsAsKeyValue[+key]);
};

export const getProductsForGivenCategories = (productsAsArray: Product[], categories: Category[]): Product[] => {
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

export const toProductEnriched = (
  product: Product,
  orderSimpleEntriesAsArray: OrderSimpleEntry[]
): ProductEnriched => {
  if (!product) {
    return null;
  }

  const orderSimpleEntryFound: OrderSimpleEntry = orderSimpleEntriesAsArray.find(
    (orderSimpleEntry: OrderSimpleEntry): boolean => orderSimpleEntry.productId === product.id
  );

  return {
    ...product,
    images: product.images
      ? [...product.images].sort((a: Image, b: Image): number => (a.order === b.order ? 0 : a.order < b.order ? -1 : 1))
      : [],
    orderEntry: orderSimpleEntryFound ? toOrderEntry(orderSimpleEntryFound) : null
  };
};
