import { Order, OrderItem, OrderItemStore, OrderStore } from '../../models/order.model';
import { Product } from '../../models/product.model';

export const toOrder = (orderStore: OrderStore): Order => {
  return {
    ...orderStore
  };
};

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

export const getAsArray = <T>(asKeyValue: { [key: number]: T }): T[] => {
  return Object.keys(asKeyValue).map((key: string): T => asKeyValue[+key]);
};
