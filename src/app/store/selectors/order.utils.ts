import { OrderItem, OrderItemStore } from '../../models/order.model';
import { Product } from '../../models/product.model';

export const toOrderItem = (
  orderItemStore: OrderItemStore,
  productsAsKeyValue: { [id: number]: Product } = null
): OrderItem => {
  const product: Product = productsAsKeyValue ? productsAsKeyValue[orderItemStore.productId] : null;

  return {
    ...orderItemStore,
    isQuantityDecrementActive: orderItemStore.quantity > 1,
    product,
    totalPrice: product ? product.price * orderItemStore.quantity : 0
  };
};

export const getOrderItemsStoreAsArray = (orderItemsStoreAsKeyValue: {
  [key: number]: OrderItemStore;
}): OrderItemStore[] => {
  return Object.keys(orderItemsStoreAsKeyValue).map((key: string): OrderItemStore => orderItemsStoreAsKeyValue[+key]);
};
