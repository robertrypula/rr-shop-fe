import { CategoryStore } from '../../models/category.model';
import { ImageDto } from '../image/image.dtos';
import { Image } from '../../models/image.model';

import { CategoryDto } from './api-category.dtos';

export const fromDto = (dto: CategoryDto): CategoryStore => {
  // TODO reduce number of data from the backend in simple DTO
  return {
    content: dto.content,
    contentShort: dto.contentShort,
    id: dto.id,
    images: dto.images.map((image: ImageDto): Image => ({ ...image })),
    isHiddenListOfProducts: dto.isHiddenListOfProducts,
    isNotClickable: dto.isNotClickable,
    isVisibleListOfCategories: dto.isVisibleListOfCategories,
    linkId: dto.linkId,
    linkOpenInNewTab: dto.linkOpenInNewTab,
    linkText: dto.linkText,
    name: dto.name,
    parentId: dto.parentId,
    slug: dto.slug,
    sortOrder: dto.sortOrder,
    structuralNode: dto.structuralNode
  };
};
