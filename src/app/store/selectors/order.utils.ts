import { Order, OrderStore } from '../../models/order.model';
import { Product } from '../../models/product.model';
import { PromoCode } from '../../models/promo-code.model';
import { OrderItem, OrderItemStore } from '../../models/order-item.model';

export const toOrderWithAllRelations = (
  orderStore: OrderStore,
  productsAsKeyValue: { [id: number]: Product }
): Order => {
  const order: Order = new Order().fromStore(orderStore);

  order.orderItems = getAsArray(orderStore.orderItemsStore).map(
    (orderItemStore: OrderItemStore): OrderItem => toOrderItem(orderItemStore, productsAsKeyValue).setOrder(order)
  );
  order.promoCode = orderStore.promoCodeStore
    ? new PromoCode().fromStore(orderStore.promoCodeStore).setOrder(order)
    : null;

  return order;
};

export const toOrderItem = (
  orderItemStore: OrderItemStore,
  productsAsKeyValue: { [id: number]: Product } = null
): OrderItem => {
  // TODO refactor this when Product will follow class model pattern
  const orderItem: OrderItem = new OrderItem().fromStore(orderItemStore);

  orderItem.product = productsAsKeyValue ? productsAsKeyValue[orderItemStore.productId] : null;

  return orderItem;
};

export const getAsArray = <T>(asKeyValue: { [key: number]: T }): T[] => {
  return Object.keys(asKeyValue).map((key: string): T => asKeyValue[+key]);
};
