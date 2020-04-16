import {
  OrderCreateRequestDto,
  OrderCreateResponseDto,
  OrderResponseDto,
  OrderResponseOrderItem
} from './api-order.dtos';
import { Order, OrderStore } from '../../models/order.model';
import { OrderItem, OrderItemStore } from '../../models/order-item.model';
import { Type } from '../../models/product.model';

export const toOrderCreateRequest = (order: Order): OrderCreateRequestDto => {
  return {
    orderItems: order.orderItems.map((orderItem: OrderItem) => ({
      priceUnitOriginal: orderItem.getPriceUnitOriginal(),
      priceUnitSelling: orderItem.getPriceUnitSelling(),
      productId: orderItem.productId,
      quantity: orderItem.quantity
    })),
    // ---
    email: order.email,
    phone: order.phone,
    name: order.name,
    surname: order.surname,
    address: order.address,
    zipCode: order.zipCode,
    city: order.city,
    comments: order.comments,
    // ---
    promoCode: order.promoCode
      ? {
          name: order.promoCode.name,
          percentageDiscount: order.promoCode.percentageDiscount
        }
      : null,
    // ---
    priceTotalOriginalAll: order.getPriceTotalOriginal([Type.Delivery, Type.Payment, Type.Product]),
    priceTotalOriginalDelivery: order.getPriceTotalOriginal([Type.Delivery]),
    priceTotalOriginalPayment: order.getPriceTotalOriginal([Type.Payment]),
    priceTotalOriginalProduct: order.getPriceTotalOriginal([Type.Product]),
    priceTotalSellingAll: order.getPriceTotalSelling([Type.Delivery, Type.Payment, Type.Product]),
    priceTotalSellingDelivery: order.getPriceTotalSelling([Type.Delivery]),
    priceTotalSellingPayment: order.getPriceTotalSelling([Type.Payment]),
    priceTotalSellingProduct: order.getPriceTotalSelling([Type.Product])
  };
};

export const fromOrderCreateResponseDto = (orderCreateResponseDto: OrderCreateResponseDto): OrderStore => {
  if (!orderCreateResponseDto.uuid) {
    throw new Error(`Missing UUID`); // TODO use class validator
  }

  return {
    uuid: orderCreateResponseDto.uuid
  };
};

export const fromOrderResponseDto = (orderResponseDto: OrderResponseDto): OrderStore => {
  return {
    uuid: orderResponseDto.uuid,
    number: orderResponseDto.number,
    status: orderResponseDto.status,
    orderItemsStore: (orderResponseDto.orderItems ? orderResponseDto.orderItems : [])
      .map(
        (orderResponseOrderItem: OrderResponseOrderItem): OrderItemStore => ({
          id: null,
          uuid: orderResponseOrderItem.uuid,
          name: orderResponseOrderItem.name,
          priceUnitOriginal: orderResponseOrderItem.priceUnitOriginal,
          priceUnitSelling: orderResponseOrderItem.priceUnitSelling,
          productId: orderResponseOrderItem.productId,
          quantity: orderResponseOrderItem.quantity,
          type: orderResponseOrderItem.type
        })
      )
      .reduce((accumulator: { [uuid: string]: OrderItemStore }, orderItemStore: OrderItemStore): {
        [uuid: string]: OrderItemStore;
      } => {
        accumulator[orderItemStore.uuid] = orderItemStore;

        return accumulator;
      }, {})
  };
};
