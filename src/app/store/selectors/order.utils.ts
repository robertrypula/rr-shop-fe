import { Order, OrderItem, OrderItemStore, OrderStore, Type } from '../../models/order.model';
import { Product } from '../../models/product.model';
import { PromoCode } from '../../models/promo-code.model';

export const toOrderWithAllRelations = (
  orderStore: OrderStore,
  productsAsKeyValue: { [id: number]: Product }
): Order => {
  const orderItems: OrderItem[] = getAsArray(orderStore.orderItemsStore).map(
    (orderItemStore: OrderItemStore): OrderItem => toOrderItem(orderItemStore, productsAsKeyValue)
  );
  const orderItemsByAllTypes: OrderItem[] = getOrderItemsByType(orderItems, [
    Type.Delivery,
    Type.Payment,
    Type.Product
  ]);
  const orderItemsByDeliveryType: OrderItem[] = getOrderItemsByType(orderItems, [Type.Delivery]);
  const orderItemsByPaymentType: OrderItem[] = getOrderItemsByType(orderItems, [Type.Payment]);
  const orderItemsByProductType: OrderItem[] = getOrderItemsByType(orderItems, [Type.Product]);

  const order: Order = {
    ...orderStore,
    isBasketEmpty: orderItemsByProductType.length === 0,
    isValid: undefined,
    orderItems,
    priceTotalAllOriginal: getPriceTotalOriginal(orderItemsByAllTypes),
    priceTotalAllSelling: getPriceTotalSelling(orderItemsByAllTypes),
    priceTotalDeliveryOriginal: getPriceTotalOriginal(orderItemsByDeliveryType),
    priceTotalDeliverySelling: getPriceTotalSelling(orderItemsByDeliveryType),
    priceTotalPaymentOriginal: getPriceTotalOriginal(orderItemsByPaymentType),
    priceTotalPaymentSelling: getPriceTotalSelling(orderItemsByPaymentType),
    priceTotalProductOriginal: getPriceTotalOriginal(orderItemsByProductType),
    priceTotalProductSelling: getPriceTotalSelling(orderItemsByProductType),
    promoCode: orderStore.promoCodeStore ? new PromoCode().fromStore(orderStore.promoCodeStore) : null,
    quantityTotalProduct: getQuantityTotal(orderItemsByProductType)
  };

  return {
    ...order,
    isValid: isValid(order)
  };
};

export const toOrderItem = (
  orderItemStore: OrderItemStore,
  productsAsKeyValue: { [id: number]: Product } = null
): OrderItem => {
  const orderItem: OrderItem = new OrderItem().fromStore(orderItemStore);

  orderItem.product = productsAsKeyValue ? productsAsKeyValue[orderItemStore.productId] : null;

  return orderItem;
};

export const getAsArray = <T>(asKeyValue: { [key: number]: T }): T[] => {
  return Object.keys(asKeyValue).map((key: string): T => asKeyValue[+key]);
};

export const getOrderItemsByType = (orderItems: OrderItem[], types: Type[]): OrderItem[] =>
  orderItems.filter((orderItem: OrderItem): boolean => types.includes(orderItem.type));

export const getPriceTotalOriginal = (orderItems: OrderItem[]): number =>
  orderItems.reduce(
    (accumulator: number, orderItem: OrderItem): number => accumulator + orderItem.getPriceTotalOriginal(),
    0
  );

export const getPriceTotalSelling = (orderItems: OrderItem[]): number =>
  orderItems.reduce(
    (accumulator: number, orderItem: OrderItem): number => accumulator + orderItem.getPriceTotalSelling(),
    0
  );

export const getQuantityTotal = (orderItems: OrderItem[]): number =>
  orderItems.reduce((accumulator: number, orderItem: OrderItem): number => accumulator + orderItem.quantity, 0);

export const isValid = (order: Order): boolean => {
  return true; // orderItemsNormal.length > 0 && orderItemsDelivery.length === 1 && orderItemsPayment.length === 1;
};
