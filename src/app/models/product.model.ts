import { Image, ImageDto } from './image.model';
import { BasketEntry } from './basket.model';

export interface Product {
  categoryIds: number[];
  description?: string;
  id: number;
  images?: Image[];
  name?: string;
  price?: number;
  quantity?: number;
  slug?: string;
}

// -----------------------------------------------------------------------------

export interface ProductEnriched extends Product {
  basketEntry: BasketEntry;
}

// -----------------------------------------------------------------------------

export interface ProductInitDto {
  categoryIds: number[];
  id: number;
}

export interface ProductSimpleDto extends ProductInitDto {
  images?: ImageDto[];
  name: string;
  price?: number;
  slug: string;
}

export interface ProductFullDto extends ProductSimpleDto {
  description?: string;
  quantity?: number;
}
