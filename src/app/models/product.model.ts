import { Image } from './image.model';
import { OrderItem } from './order.model';

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

export interface ProductEnriched extends Product {
  orderItem: OrderItem;
}
