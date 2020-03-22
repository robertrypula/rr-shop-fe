import { ImageDto } from '../image/image.dtos';

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
