import { ProductFullDto, ProductMediumDto, ProductMinimalDto } from './api-product.dtos';
import { ProductStore } from '../../models/product.model';
import { ImageDto } from '../image/image.dtos';
import { Image } from '../../models/image.model';

export const fromMinimalDto = (dto: ProductMinimalDto): ProductStore => {
  return {
    categoryIds: dto.categoryIds,
    id: dto.id
  };
};

export const fromMediumDto = (dto: ProductMediumDto): ProductStore => {
  return {
    categoryIds: dto.categoryIds,
    id: dto.id,
    images: dto.images.map((image: ImageDto): Image => ({ ...image })),
    name: dto.name,
    priceUnit: dto.priceUnit,
    quantity: dto.quantity,
    slug: dto.slug
  };
};

export const fromFullDto = (dto: ProductFullDto): ProductStore => {
  return {
    categoryIds: dto.categoryIds,
    deliveryType: dto.deliveryType,
    description: dto.description,
    id: dto.id,
    images: dto.images.map((image: ImageDto): Image => ({ ...image })),
    name: dto.name,
    paymentType: dto.paymentType,
    priceUnit: dto.priceUnit,
    quantity: dto.quantity,
    slug: dto.slug,
    type: dto.type
  };
};
