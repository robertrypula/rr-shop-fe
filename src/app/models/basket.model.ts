import { Product } from './product.model';

export interface BasketSimpleEntry {
  id: number;
  productId: number;
  quantity: number;
}

export interface BasketEntry extends BasketSimpleEntry {
  isQuantityDecreaseActive: boolean;
  product: Product;
}
