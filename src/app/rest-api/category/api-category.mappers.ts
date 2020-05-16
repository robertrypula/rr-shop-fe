import { CategoryStore } from '../../models/category.model';

import { CategoryDto } from './api-category.dtos';

export const fromDto = (dto: CategoryDto): CategoryStore => {
  // TODO reduce number of data from the backend in simple DTO
  return {
    content: dto.content,
    id: dto.id,
    isNotClickable: dto.isNotClickable,
    isHiddenListOfProducts: dto.isHiddenListOfProducts,
    name: dto.name,
    parentId: dto.parentId,
    slug: dto.slug,
    structuralNode: dto.structuralNode
  };
};
