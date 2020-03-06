import { Product } from './product.model';

export interface BasketSimpleEntry {
  id: number;
  productId: number;
  quantity: number;
}

export interface BasketEntry extends BasketSimpleEntry {
  isQuantityDecrementActive: boolean;
  product: Product;
  totalPrice: number;
}
