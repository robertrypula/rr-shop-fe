export interface CategoryDto {
  content?: string;
  id: number;
  isUnAccessible?: boolean;
  name: string;
  parentId: number;
  slug?: string;
  structuralNode?: StructuralNode;
}

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
