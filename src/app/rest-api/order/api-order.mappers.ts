import { OrderCreateRequestDto, OrderCreateResponseDto, OrderResponseDto } from './api-order.dtos';
import { Order, OrderStore } from '../../models/order.model';
import { OrderItem } from '../../models/order-item.model';
import { Type } from '../../models/product.model';

export const toOrderCreateRequest = (order: Order): OrderCreateRequestDto => {
  return {
    orderItems: order.orderItems.map((orderItem: OrderItem) => ({
      priceUnitOriginal: orderItem.getPriceUnitOriginal(),
      priceUnitSelling: orderItem.getPriceUnitSelling(),
      productId: orderItem.productId,
      quantity: orderItem.quantity,
      type: orderItem.type
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
