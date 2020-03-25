import { Image } from './image.model';
import { OrderItem } from './order-item.model';

export enum Type {
  Delivery = 'Delivery',
  Payment = 'Payment',
  Product = 'Product'
}

export enum DeliveryType {
  Courier = 'Courier',
  Own = 'Own',
  Paczkomaty = 'Paczkomaty',
  Post = 'Post'
}

export enum PaymentType {
  BankTransfer = 'BankTransfer',
  PayU = 'PayU'
}

// -----------------------------------------------------------------------------

// TODO rename from 'Product' to 'ProductStore'
export interface Product {
  id: number;
  name?: string;
  slug?: string;
  description?: string;
  quantity?: number;
  priceUnit?: number;
  type?: Type;
  deliveryType?: DeliveryType;
  paymentType?: PaymentType;
  images?: Image[];
  categoryIds: number[];
}

// -----------------------------------------------------------------------------

// TODO rename from 'ProductEnriched' to 'Product'
// TODO migrate from interface to class
export interface ProductEnriched extends Product {
  orderItem: OrderItem;
}
