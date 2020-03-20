import { Order, OrderItem, OrderItemStore, OrderStore, Type } from '../../models/order.model';
import { Product } from '../../models/product.model';
import { PromoCode, PromoCodeStore } from '../../models/promo-code.model';

export const toOrder = (orderStore: OrderStore, productsAsKeyValue: { [id: number]: Product }): Order => {
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
    promoCode: toPromoCode(orderStore.promoCodeStore),
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
  const product: Product = productsAsKeyValue ? productsAsKeyValue[orderItemStore.productId] : null;

  return {
    ...orderItemStore,
    isQuantityDecrementActive: orderItemStore.quantity > 1,
    product,
    priceTotalOriginal: (product ? product.priceUnit : 0) * orderItemStore.quantity,
    priceTotalSelling: (product ? product.priceUnit : 0) * orderItemStore.quantity
  };
};

export const toPromoCode = (promoCodeStore: PromoCodeStore): PromoCode => {
  return promoCodeStore ? { ...promoCodeStore } : null;
};

export const getAsArray = <T>(asKeyValue: { [key: number]: T }): T[] => {
  return Object.keys(asKeyValue).map((key: string): T => asKeyValue[+key]);
};

export const getOrderItemsByType = (orderItems: OrderItem[], types: Type[]): OrderItem[] =>
  orderItems.filter((orderItem: OrderItem): boolean => types.includes(orderItem.type));

export const getPriceTotalOriginal = (orderItems: OrderItem[]): number =>
  orderItems.reduce(
    (accumulator: number, orderItem: OrderItem): number => accumulator + orderItem.priceTotalOriginal,
    0
  );

export const getPriceTotalSelling = (orderItems: OrderItem[]): number =>
  orderItems.reduce(
    (accumulator: number, orderItem: OrderItem): number => accumulator + orderItem.priceTotalSelling,
    0
  );

export const getQuantityTotal = (orderItems: OrderItem[]): number =>
  orderItems.reduce((accumulator: number, orderItem: OrderItem): number => accumulator + orderItem.quantity, 0);

export const isValid = (order: Order): boolean => {
  return true; // orderItemsNormal.length > 0 && orderItemsDelivery.length === 1 && orderItemsPayment.length === 1;
};
