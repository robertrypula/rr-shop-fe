import { ImageDto } from '../image/image.dtos';
import { ManufacturerDto } from '../manufacturer/manufacturer.dtos';
import { DeliveryType, PaymentType, Type } from '../../models/product.model';

export enum FetchType {
  Minimal = 'Minimal',
  Medium = 'Medium',
  Full = 'Full'
}

export interface ProductMinimalDto {
  id: number;
  categoryIds: number[];
}

export interface ProductMediumDto extends ProductMinimalDto {
  name: string;
  slug: string;
  quantity: number;
  priceUnit: number;
  images: ImageDto[];
  manufacturer: ManufacturerDto;
}

export interface ProductFullDto extends ProductMediumDto {
  description: string;
  type: Type;
  deliveryType: DeliveryType;
  paymentType: PaymentType;
}
