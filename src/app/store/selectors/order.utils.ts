import { OrderItem, OrderItemStore } from '../../models/order-item.model';
import { Order, OrderStore } from '../../models/order.model';
import { Payment, PaymentStore } from '../../models/payment.model';
import { ProductStore } from '../../models/product.model';
import { PromoCode } from '../../models/promo-code.model';
import { getAsArrayUuid } from '../../utils/transfomation.utils';

export const toOrder = (orderStore: OrderStore, productsStore: ProductStore[]): Order => {
  const order: Order = new Order().fromStore(orderStore);

  order.orderItems = getAsArrayUuid(orderStore.orderItemsStore || {}).map(
    (orderItemStore: OrderItemStore): OrderItem => toOrderItem(orderItemStore, productsStore).setOrder(order)
  );
  order.payments = getAsArrayUuid(orderStore.paymentsStore || {}).map(
    (paymentStore: PaymentStore): Payment => new Payment().fromStore(paymentStore).setOrder(order)
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

export const toOrderItem = (orderItemStore: OrderItemStore, productsStore: ProductStore[] = null): OrderItem => {
  // TODO refactor this when Product will follow class model pattern
  const orderItem: OrderItem = new OrderItem().fromStore(orderItemStore);

  orderItem.productStore = (productsStore || []).find(
    (productStore: ProductStore): boolean => productStore.id === orderItemStore.productId
  );
  // TODO add product member and create product object - currently it's ProductEnriched

  return orderItem;
};
