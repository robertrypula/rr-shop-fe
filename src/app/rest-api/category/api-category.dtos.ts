import { StructuralNode } from '../../models/category.model';

// TODO reduce number of data from the backend in simple DTO
export interface CategoryDto {
  content?: string;
  id: number;
  isUnAccessible?: boolean;
  isWithoutProducts?: boolean;
  name: string;
  parentId: number;
  slug?: string;
  structuralNode?: StructuralNode;
}
