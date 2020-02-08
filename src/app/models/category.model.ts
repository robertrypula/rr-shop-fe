export enum StructuralNode {
  Footer = 'Footer',
  FooterMap = 'FooterMap',
  Header = 'Header',
  ShopCategories = 'ShopCategories'
}

export interface Category {
  id: number;
  name: string;
  structuralNode?: StructuralNode;
  slug?: string;
  content?: string;
  parentId: number;
  activeLevel?: number;
  isUnAccessible?: boolean;
}
