import { Product } from './product.model';

export enum Type {
  Delivery = 'Delivery',
  Normal = 'Normal',
  Payment = 'Payment'
}

export interface BasketSimpleEntry {
  id: number;
  productId: number;
  quantity: number;
  type: Type;
}

export interface BasketEntry extends BasketSimpleEntry {
  isQuantityDecrementActive: boolean;
  product: Product;
  totalPrice: number;
}
