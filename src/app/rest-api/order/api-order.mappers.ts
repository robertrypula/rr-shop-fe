import { OrderCreateRequestDto, OrderCreateResponseDto, OrderResponseDto } from './api-order.dtos';
import { Order, OrderStore } from '../../models/order.model';
import { OrderItem, Type } from '../../models/order-item.model';

export const toOrderCreateRequest = (order: Order): OrderCreateRequestDto => {
  return {
    orderItems: order.orderItems.map((orderItem: OrderItem) => ({
      priceUnitOriginal: orderItem.getPriceUnitOriginal(),
      priceUnitSelling: orderItem.getPriceUnitSelling(),
      productId: orderItem.productId,
      quantity: orderItem.quantity,
      type: orderItem.type
    })),
    priceTotalOriginalAll: order.getPriceTotalOriginal([Type.Delivery, Type.Payment, Type.Product]),
    priceTotalOriginalDelivery: order.getPriceTotalOriginal([Type.Delivery]),
    priceTotalOriginalPayment: order.getPriceTotalOriginal([Type.Payment]),
    priceTotalOriginalProduct: order.getPriceTotalOriginal([Type.Product]),
    priceTotalSellingAll: order.getPriceTotalSelling([Type.Delivery, Type.Payment, Type.Product]),
    priceTotalSellingDelivery: order.getPriceTotalSelling([Type.Delivery]),
    priceTotalSellingPayment: order.getPriceTotalSelling([Type.Payment]),
    priceTotalSellingProduct: order.getPriceTotalSelling([Type.Product]),
    promoCodeTextField: order.promoCodeTextField
  };
};

export const fromOrderCreateResponse = (orderCreateResponseDto: OrderCreateResponseDto): OrderStore => {
  if (!orderCreateResponseDto.uuid) {
    throw new Error(`Missing UUID`); // TODO use class validator
  }

  return {
    uuid: orderCreateResponseDto.uuid
  };
};

export const fromOrderResponse = (orderResponseDto: OrderResponseDto): OrderStore => {
  return {
    uuid: orderResponseDto.uuid,
    number: orderResponseDto.number,
    status: orderResponseDto.status
  };
};
