import { StructuralNode } from '../../models/category.model';

// TODO reduce number of data from the backend in simple DTO
export interface CategoryDto {
  content?: string;
  id: number;
  isNotClickable?: boolean;
  isHiddenListOfProducts?: boolean;
  name: string;
  parentId: number;
  slug?: string;
  structuralNode?: StructuralNode;
}
