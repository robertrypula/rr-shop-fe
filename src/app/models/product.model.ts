import { Image } from './image.model';
import { OrderItem } from './order-item.model';
import { Manufacturer } from './manufacturer.model';

export enum Type {
  Delivery = 'Delivery',
  Payment = 'Payment',
  Product = 'Product'
}

export enum DeliveryType {
  InPostCourier = 'InPostCourier',
  InPostParcelLocker = 'InPostParcelLocker',
  Own = 'Own'
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
  manufacturer?: Manufacturer; // TODO it should be manufacturerStore
  categoryIds: number[];
}

// -----------------------------------------------------------------------------

// TODO migrate from interface to class
export interface Product extends ProductStore {
  // NOTE: actually products have OneToMany relation to orderItems but I limited it to only
  // on single 'basket' which have one entry per product (multiple products are modeled as quantity)
  orderItem: OrderItem;
}
