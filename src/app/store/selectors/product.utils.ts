import { Product, ProductEnriched } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { BasketSimpleEntry } from '../../models/basket.model';

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
  basketSimpleEntriesAsArray: BasketSimpleEntry[]
): ProductEnriched => {
  return {
    ...product,
    basketSimpleEntry: basketSimpleEntriesAsArray.find(
      (basketSimpleEntry: BasketSimpleEntry): boolean => basketSimpleEntry.productId === product.id
    )
  };
};
