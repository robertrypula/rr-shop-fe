import { StructuralNode } from '../../models/category.model';
import { Image } from '../../models/image.model';

// TODO reduce number of data from the backend in simple DTO
export interface CategoryDto {
  content?: string;
  contentShort?: string;
  id: number;
  images?: Image[];
  isHiddenListOfProducts?: boolean;
  isNotClickable?: boolean;
  isVisibleListOfCategories?: boolean;
  linkId?: number;
  linkOpenInNewTab?: boolean;
  linkText?: string;
  name: string;
  parentId: number;
  slug?: string;
  sortOrder?: number;
  structuralNode?: StructuralNode;
}
