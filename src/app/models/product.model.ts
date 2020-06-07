import { CategoryStore } from './category.model';
import { Image } from './image.model';
import { Manufacturer } from './manufacturer.model';
import { OrderItem } from './order-item.model';

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

export enum ProductSortBy {
  None = 'None',
  NameAscending = 'NameAscending',
  NameDescending = 'NameDescending',
  PriceAscending = 'PriceAscending',
  PriceDescending = 'PriceDescending'
}

export const URL_SORT_BY_NONE = '-';
export const URL_SORT_BY_NAME_ASCENDING = 'name-asc';
export const URL_SORT_BY_NAME_DESCENDING = 'name-desc';
export const URL_SORT_BY_PRICE_ASCENDING = 'price-asc';
export const URL_SORT_BY_PRICE_DESCENDING = 'price-desc';

// -----------------------------------------------------------------------------

export interface ProductStore {
  id: number;
  name?: string;
  slug?: string;
  description?: string;
  descriptionDelivery?: string;
  isDeliveryBlockedCourier?: boolean;
  isDeliveryBlockedParcelLocker?: boolean;
  quantity?: number;
  priceUnit?: number;
  priceUnitBeforePromotion?: number;
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
  categories?: CategoryStore[];
}
