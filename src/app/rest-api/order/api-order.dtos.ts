import { Status } from '../../models/order.model';
import { DeliveryType, PaymentType, Type } from '../../models/product.model';

export interface OrderCreateRequestDto {
  orderItems: Array<{
    priceUnitOriginal: number;
    priceUnitSelling: number;
    productId: number;
    quantity: number;
  }>;
  // ---
  email?: string;
  phone?: string;
  name?: string;
  surname?: string;
  address?: string;
  zipCode?: string;
  city?: string;
  comments?: string;
  // ---
  promoCode?: {
    name: string;
    percentageDiscount: number;
  };
  // ---
  priceTotalOriginalAll: number;
  priceTotalOriginalDelivery: number;
  priceTotalOriginalPayment: number;
  priceTotalOriginalProduct: number;
  priceTotalSellingAll: number;
  priceTotalSellingDelivery: number;
  priceTotalSellingPayment: number;
  priceTotalSellingProduct: number;
}

export interface OrderCreateResponseDto {
  uuid: string; // uuid to avoid sharing information about e-shop orders amount
}

export interface OrderResponseOrderItem {
  uuid: string;
  name: string;
  priceUnitOriginal: number;
  priceUnitSelling: number;
  productId: number;
  quantity: number;
  type: Type;
  deliveryType: DeliveryType;
  paymentType: PaymentType;
}

export interface OrderResponsePayment {
  uuid: string;
  amount: number;
  paymentType: PaymentType;
  url: string;
}

export interface OrderResponsePromoCode {
  name: string;
  percentageDiscount: number;
}

export interface OrderResponseDto {
  uuid: string; // uuid to avoid sharing information about e-shop orders amount
  number: string;
  status: Status;
  orderItems: OrderResponseOrderItem[];
  payment: OrderResponsePayment[];
  promoCode: OrderResponsePromoCode;
}
