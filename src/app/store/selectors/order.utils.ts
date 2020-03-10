import { Order, OrderStore } from '../../models/order.model';

export const toOrder = (orderStore: OrderStore): Order => {
  return {
    ...orderStore
  };
};

export const getOrdersStoreAsArray = (ordersAsKeyValue: { [key: number]: OrderStore }): OrderStore[] => {
  return Object.keys(ordersAsKeyValue).map((key: string): OrderStore => ordersAsKeyValue[+key]);
};
