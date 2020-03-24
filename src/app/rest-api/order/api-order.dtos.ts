import { Status } from '../../models/order.model';
import { Type } from '../../models/order-item.model';

export interface OrderCreateRequestDto {
  orderItems: Array<{
    priceUnitOriginal: number;
    priceUnitSelling: number;
    productId: number;
    quantity: number;
    type: Type;
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

export interface OrderResponseDto {
  uuid: string; // uuid to avoid sharing information about e-shop orders amount
  number: string;
  status: Status;
  // ---
  orderItems: Array<{
    name: string;
    priceUnitOriginal: number;
    priceUnitSelling: number;
    productId: number;
    quantity: number;
    type: Type;
  }>;
}
