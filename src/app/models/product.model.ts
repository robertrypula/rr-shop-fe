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

export interface ProductStore {
  id: number;
  name?: string;
  slug?: string;
  description?: string;
  quantity?: number;
  priceUnit?: number;
  type?: Type;
  deliveryType?: DeliveryType;
  paymentType?: PaymentType;
  images?: Image[]; // TODO it should be imagesStore
  categoryIds: number[];
}

// -----------------------------------------------------------------------------

// TODO rename from 'ProductEnriched' to 'Product'
// TODO migrate from interface to class
export interface ProductEnriched extends ProductStore {
  // NOTE: actually products have OneToMany relation to orderItems but I limited it to only
  // on single 'basket' which have one entry per product (multiple products are modeled as quantity)
  orderItem: OrderItem;
}
