import { OrderCreateRequestDto, OrderCreateResponseDto } from './api-order.dtos';
import { Order, OrderItem, OrderStore } from '../../models/order.model';

export const toOrderCreateRequest = (order: Order): OrderCreateRequestDto => {
  return {
    orderItems: order.orderItems.map((orderItem: OrderItem) => ({
      priceUnitOriginal: orderItem.product.priceUnit,
      priceUnitSelling: orderItem.product.priceUnit, // TODO here put price after discount
      productId: orderItem.productId,
      quantity: orderItem.quantity,
      type: orderItem.type
    })),
    priceTotal: order.priceTotal,
    priceTotalDelivery: order.priceTotalDelivery,
    priceTotalPayment: order.priceTotalPayment,
    priceTotalProduct: order.priceTotalProduct,
    quantityTotalProduct: order.quantityTotalProduct
  };
};

export const fromOrderCreateResponse = (orderCreateResponseDto: OrderCreateResponseDto): OrderStore => {
  return {
    uuid: orderCreateResponseDto.uuid
  };
};
