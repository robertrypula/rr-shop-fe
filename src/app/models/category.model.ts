export enum StructuralNode {
  Footer = 'Footer',
  FooterMap = 'FooterMap',
  Header = 'Header',
  ShopCategories = 'ShopCategories'
}

export interface ActiveLevelUpdateEntry {
  activeLevel: number;
  id: number;
}

export interface Category {
  activeLevel?: number;
  content?: string;
  id: number;
  isUnAccessible?: boolean;
  name: string;
  parentId: number;
  slug?: string;
  structuralNode?: StructuralNode;
}

// TODO reduce number of data from the backend in simple DTO
export interface CategorySimpleDto {
  content?: string;
  id: number;
  isUnAccessible?: boolean;
  name: string;
  parentId: number;
  slug?: string;
  structuralNode?: StructuralNode;
}
