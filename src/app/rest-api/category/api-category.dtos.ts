import { StructuralNode } from '../../models/category.model';

// TODO reduce number of data from the backend in simple DTO
export interface CategoryDto {
  content?: string;
  id: number;
  isHiddenListOfProducts?: boolean;
  isNotClickable?: boolean;
  isVisibleListOfCategories?: boolean;
  linkId?: number;
  linkOpenInNewTab?: boolean;
  linkText?: string;
  name: string;
  parentId: number;
  slug?: string;
  structuralNode?: StructuralNode;
}
