import { ImageDto } from './image.model';
import { BasketEntry, BasketSimpleEntry } from './basket.model';

export interface Product {
  categoryIds: number[];
  description?: string;
  id: number;
  imageIds?: number[];
  name?: string;
  price?: number;
  quantity?: number;
  slug?: string;
}

export interface ProductEnriched extends Product {
  basketEntry: BasketEntry;
}

export interface ProductFullDto {
  categoryIds: number[];
  description?: string;
  id: number;
  images?: ImageDto[];
  name?: string;
  price?: number;
  quantity?: number;
  slug?: string;
}

export interface ProductInitDto {
  categoryIds: number[];
  id: number;
}

export interface ProductSimpleDto {
  categoryIds: number[];
  id: number;
  images?: ImageDto[];
  name: string;
  price?: number;
  slug: string;
}
