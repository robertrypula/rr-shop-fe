import { OrderEntry, OrderSimpleEntry } from '../../models/order.model';
import { Product } from '../../models/product.model';

export const toOrderEntry = (
  orderSimpleEntry: OrderSimpleEntry,
  productsAsKeyValue: { [id: number]: Product } = null
): OrderEntry => {
  const product: Product = productsAsKeyValue ? productsAsKeyValue[orderSimpleEntry.productId] : null;

  return {
    ...orderSimpleEntry,
    isQuantityDecrementActive: orderSimpleEntry.quantity > 1,
    product,
    totalPrice: product ? product.price * orderSimpleEntry.quantity : 0
  };
};

export const getOrderSimpleEntriesAsArray = (orderSimpleEntriesAsKeyValue: {
  [key: number]: OrderSimpleEntry;
}): OrderSimpleEntry[] => {
  return Object.keys(orderSimpleEntriesAsKeyValue).map(
    (key: string): OrderSimpleEntry => orderSimpleEntriesAsKeyValue[+key]
  );
};
