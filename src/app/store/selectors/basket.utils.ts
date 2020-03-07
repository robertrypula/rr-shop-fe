import { BasketEntry, BasketSimpleEntry } from '../../models/basket.model';
import { Product } from '../../models/product.model';

export const toBasketEntry = (
  basketSimpleEntry: BasketSimpleEntry,
  productsAsKeyValue: { [id: number]: Product } = null
): BasketEntry => {
  const product: Product = productsAsKeyValue ? productsAsKeyValue[basketSimpleEntry.productId] : null;

  return {
    ...basketSimpleEntry,
    isQuantityDecrementActive: basketSimpleEntry.quantity > 1,
    product,
    totalPrice: product ? product.price * basketSimpleEntry.quantity : 0
  };
};

export const getBasketSimpleEntriesAsArray = (basketSimpleEntriesAsKeyValue: {
  [key: number]: BasketSimpleEntry;
}): BasketSimpleEntry[] => {
  return Object.keys(basketSimpleEntriesAsKeyValue).map(
    (key: string): BasketSimpleEntry => basketSimpleEntriesAsKeyValue[+key]
  );
};
