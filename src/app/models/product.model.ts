import { Image } from './image.model';

export interface Product {
  categoryIds: number[];
  description?: string;
  id: number;
  // images?: Image[];
  name?: string;
  price?: number;
  quantity?: number;
  slug?: string;
}

export interface ProductFullDto {
  categoryIds: number[];
  description?: string;
  id: number;
  // images?: Image[];
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
  name: string;
  price?: number;
  slug: string;
}
