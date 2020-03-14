import { Product } from './product.model';

export enum Type {
  Delivery = 'Delivery',
  Normal = 'Normal',
  Payment = 'Payment'
}

// -----------------------------------------------------------------------------

export interface OrderItemStore {
  id: number;
  productId: number;
  quantity: number;
  type: Type;
}

export interface OrderStore {
  id: number;
  uuid: string;
  number: string;
  email: string;
  phone?: string;
  name?: string;
  surname?: string;
  address?: string;
  zipCode?: string;
  city?: string;
  comments?: string;
  parcelLocker: string;
  paymentUrl: string;
  // ---
  orderItemsStore: { [key: string]: OrderItemStore };
}

// -----------------------------------------------------------------------------

export interface OrderItem extends OrderItemStore {
  isQuantityDecrementActive: boolean;
  product: Product;
  totalPrice: number;
}

// tslint:disable-next-line:no-empty-interface
export interface Order extends OrderStore {}

// -----------------------------------------------------------------------------

// tslint:disable-next-line:no-empty-interface
export interface OrderDto {
  uuid: string;
}

// tslint:disable-next-line:no-empty-interface
export interface OrderCreateDto {}
