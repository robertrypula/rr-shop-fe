import { Image } from './image.model';
import { OrderItem } from './order-item.model';

// TODO rename from 'Product' to 'ProductStore'
export interface Product {
  categoryIds: number[];
  description?: string;
  id: number;
  images?: Image[];
  name?: string;
  priceUnit?: number;
  quantity?: number;
  slug?: string;
}

// -----------------------------------------------------------------------------

// TODO rename from 'ProductEnriched' to 'Product'
// TODO migrate from interface to class
export interface ProductEnriched extends Product {
  orderItem: OrderItem;
}
