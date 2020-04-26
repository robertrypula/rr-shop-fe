import { OrderItem, OrderItemStore } from '../../models/order-item.model';
import { Order, OrderStore } from '../../models/order.model';
import { PaymentStore } from '../../models/payment.model';
import { Type } from '../../models/product.model';

import {
  OrderCreateRequestDto,
  OrderCreateResponseDto,
  OrderResponseDto,
  OrderResponseOrderItem,
  OrderResponsePayment
} from './api-order.dtos';

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
    parcelLocker: order.parcelLocker,
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
          type: orderResponseOrderItem.type,
          paymentType: orderResponseOrderItem.paymentType,
          deliveryType: orderResponseOrderItem.deliveryType
        })
      )
      .reduce((accumulator: { [uuid: string]: OrderItemStore }, orderItemStore: OrderItemStore): {
        [uuid: string]: OrderItemStore;
      } => {
        accumulator[orderItemStore.uuid] = orderItemStore;

        return accumulator;
      }, {}),
    paymentsStore: (orderResponseDto.payments ? orderResponseDto.payments : [])
      .map(
        (orderResponsePayment: OrderResponsePayment): PaymentStore => ({
          uuid: orderResponsePayment.uuid,
          amount: orderResponsePayment.amount,
          paymentType: orderResponsePayment.paymentType,
          url: orderResponsePayment.url
        })
      )
      .reduce((accumulator: { [uuid: string]: PaymentStore }, paymentStore: PaymentStore): {
        [uuid: string]: PaymentStore;
      } => {
        accumulator[paymentStore.uuid] = paymentStore;

        return accumulator;
      }, {}),
    promoCodeStore: orderResponseDto.promoCode
      ? {
          name: orderResponseDto.promoCode.name,
          percentageDiscount: orderResponseDto.promoCode.percentageDiscount
        }
      : null,
    createdAt: new Date(orderResponseDto.createdAt),
    updatedAt: new Date(orderResponseDto.updatedAt)
  };
};
