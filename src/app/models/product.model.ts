import { Image, ImageDto } from './image.model';
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

// -----------------------------------------------------------------------------

export interface ProductInitDto {
  categoryIds: number[];
  id: number;
}

export interface ProductSimpleDto extends ProductInitDto {
  images?: ImageDto[];
  name: string;
  priceUnit?: number;
  slug: string;
}

export interface ProductFullDto extends ProductSimpleDto {
  description?: string;
  quantity?: number;
}
