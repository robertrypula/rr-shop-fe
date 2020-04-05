import { Order, OrderStore } from '../../models/order.model';
import { ProductStore } from '../../models/product.model';
import { PromoCode } from '../../models/promo-code.model';
import { OrderItem, OrderItemStore } from '../../models/order-item.model';
import { getAsArray } from '../../utils/transfomation.utils';

export const toOrderWithAllRelations = (
  orderStore: OrderStore,
  productsStoreAsKeyValue: { [id: number]: ProductStore }
): Order => {
  const order: Order = new Order().fromStore(orderStore);

  order.orderItems = getAsArray(orderStore.orderItemsStore).map(
    (orderItemStore: OrderItemStore): OrderItem => toOrderItem(orderItemStore, productsStoreAsKeyValue).setOrder(order)
  );
  order.promoCode = orderStore.promoCodeStore
    ? new PromoCode().fromStore(orderStore.promoCodeStore).setOrder(order)
    : null;

  return order;
};

export const extractClientDetailsForm = (orderStore: OrderStore): ClientDetailsForm => {
  return {
    isClientDetailsFormActive: orderStore.isClientDetailsFormActive,
    isClientDetailsFormValid: orderStore.isClientDetailsFormValid,
    email: orderStore.email,
    phone: orderStore.phone,
    name: orderStore.name,
    surname: orderStore.surname,
    address: orderStore.address,
    zipCode: orderStore.zipCode,
    city: orderStore.city,
    comments: orderStore.comments
  };
};

export const toOrderItem = (
  orderItemStore: OrderItemStore,
  productsStoreAsKeyValue: { [id: number]: ProductStore } = null
): OrderItem => {
  // TODO refactor this when Product will follow class model pattern
  const orderItem: OrderItem = new OrderItem().fromStore(orderItemStore);

  orderItem.productStore = productsStoreAsKeyValue ? productsStoreAsKeyValue[orderItemStore.productId] : null;
  // TODO add product member and create product object - currently it's ProductEnricheed

  return orderItem;
};
