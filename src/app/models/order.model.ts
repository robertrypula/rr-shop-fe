import { Product } from './product.model';

export enum Type {
  Delivery = 'Delivery',
  Normal = 'Normal',
  Payment = 'Payment'
}

export interface OrderSimpleEntry {
  id: number;
  productId: number;
  quantity: number;
  type: Type;
}

export interface OrderEntry extends OrderSimpleEntry {
  isQuantityDecrementActive: boolean;
  product: Product;
  totalPrice: number;
}

export interface OrderStore {
  number: string;
  uuid: string;
  payUUrl: string;
}

// -----------------------------------------------------------------------------

// tslint:disable-next-line:no-empty-interface
export interface Order {}

// -----------------------------------------------------------------------------

// tslint:disable-next-line:no-empty-interface
export interface OrderDto {}
