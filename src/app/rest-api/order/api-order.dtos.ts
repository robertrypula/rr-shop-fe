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
  priceTotalAll: number;
  priceTotalDelivery: number;
  priceTotalPayment: number;
  priceTotalProduct: number;
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
    nameOriginal: string;
    priceUnitOriginal: number;
    priceUnitSelling: number;
    productId: number;
    quantity: number;
    type: Type;
  }>;
}
