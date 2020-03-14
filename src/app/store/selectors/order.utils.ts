import { Order, OrderItem, OrderItemStore, OrderStore, Type } from '../../models/order.model';
import { Product } from '../../models/product.model';

export const toOrder = (orderStore: OrderStore, productsAsKeyValue: { [id: number]: Product }): Order => {
  const orderItems: OrderItem[] = getAsArray(orderStore.orderItemsStore).map(
    (orderItemStore: OrderItemStore): OrderItem => toOrderItem(orderItemStore, productsAsKeyValue)
  );
  const orderItemsByProductType: OrderItem[] = getOrderItemsByType(orderItems, [Type.Product]);

  const order: Order = {
    ...orderStore,
    isBasketEmpty: orderItemsByProductType.length === 0,
    isValid: undefined,
    orderItems,
    priceTotal: getPriceTotal(getOrderItemsByType(orderItems, [Type.Delivery, Type.Payment, Type.Product])),
    priceTotalDelivery: getPriceTotal(getOrderItemsByType(orderItems, [Type.Delivery])),
    priceTotalPayment: getPriceTotal(getOrderItemsByType(orderItems, [Type.Payment])),
    priceTotalProduct: getPriceTotal(orderItemsByProductType),
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
    totalPrice: product ? product.priceUnit * orderItemStore.quantity : 0
  };
};

export const getAsArray = <T>(asKeyValue: { [key: number]: T }): T[] => {
  return Object.keys(asKeyValue).map((key: string): T => asKeyValue[+key]);
};

export const getOrderItemsByType = (orderItems: OrderItem[], types: Type[]): OrderItem[] =>
  orderItems.filter((orderItem: OrderItem): boolean => types.includes(orderItem.type));

export const getPriceTotal = (orderItems: OrderItem[]): number =>
  orderItems.reduce((accumulator: number, orderItem: OrderItem): number => {
    return accumulator + orderItem.quantity * (orderItem.product ? orderItem.product.priceUnit : 0);
  }, 0);

export const getQuantityTotal = (orderItems: OrderItem[]): number =>
  orderItems.reduce((accumulator: number, orderItem: OrderItem): number => {
    return accumulator + orderItem.quantity;
  }, 0);

export const isValid = (order: Order): boolean => {
  return true; // orderItemsNormal.length > 0 && orderItemsDelivery.length === 1 && orderItemsPayment.length === 1;
};
