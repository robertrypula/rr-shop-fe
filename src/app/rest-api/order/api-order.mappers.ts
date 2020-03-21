import { OrderCreateRequestDto, OrderCreateResponseDto, OrderResponseDto } from './api-order.dtos';
import { Order, OrderStore } from '../../models/order.model';
import { OrderItem, Type } from '../../models/order-item.model';

export const toOrderCreateRequest = (order: Order): OrderCreateRequestDto => {
  return {
    orderItems: order.orderItems.map((orderItem: OrderItem) => ({
      priceUnitOriginal: orderItem.product.priceUnit,
      priceUnitSelling: orderItem.product.priceUnit, // TODO here put price after discount
      productId: orderItem.productId,
      quantity: orderItem.quantity,
      type: orderItem.type
    })),
    priceTotalAll: order.getPriceTotalOriginal([Type.Delivery, Type.Payment, Type.Product]),
    priceTotalDelivery: order.getPriceTotalOriginal([Type.Delivery]),
    priceTotalPayment: order.getPriceTotalOriginal([Type.Payment]),
    priceTotalProduct: order.getPriceTotalOriginal([Type.Product])
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
