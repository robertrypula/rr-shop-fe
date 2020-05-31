import { ImageDto } from '../image/image.dtos';
import { Image } from '../../models/image.model';
import { ProductStore } from '../../models/product.model';

import { ProductFullDto, ProductMediumDto, ProductMinimalDto } from './api-product.dtos';

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
    manufacturer: dto.manufacturer ? { name: dto.manufacturer.name } : null,
    name: dto.name,
    priceUnit: dto.priceUnit,
    priceUnitBeforePromotion: dto.priceUnitBeforePromotion,
    quantity: dto.quantity,
    slug: dto.slug
  };
};

export const fromFullDto = (dto: ProductFullDto): ProductStore => {
  return {
    categoryIds: dto.categoryIds,
    deliveryType: dto.deliveryType,
    description: dto.description,
    descriptionDelivery: dto.descriptionDelivery,
    id: dto.id,
    images: dto.images.map((image: ImageDto): Image => ({ ...image })),
    isDeliveryBlockedCourier: dto.isDeliveryBlockedCourier,
    isDeliveryBlockedParcelLocker: dto.isDeliveryBlockedParcelLocker,
    manufacturer: dto.manufacturer ? { name: dto.manufacturer.name } : null,
    name: dto.name,
    paymentType: dto.paymentType,
    priceUnit: dto.priceUnit,
    priceUnitBeforePromotion: dto.priceUnitBeforePromotion,
    quantity: dto.quantity,
    slug: dto.slug,
    type: dto.type
  };
};
