export enum StructuralNode {
  Delivery = 'Delivery',
  Footer = 'Footer',
  FooterMap = 'FooterMap',
  Header = 'Header',
  Payment = 'Payment',
  ShopCategories = 'ShopCategories'
}

export interface ActiveLevelUpdateEntry {
  activeLevel: number;
  id: number;
}

// -----------------------------------------------------------------------------

export interface CategoryStore {
  activeLevel?: number;
  content?: string;
  id: number;
  isUnAccessible?: boolean;
  name: string;
  parentId: number;
  slug?: string;
  structuralNode?: StructuralNode;
}

// -----------------------------------------------------------------------------

// TODO refactor Category models and store
// export interface Category extends CategoryStore {
//   productsCount: number; // TODO calculate products count in the store, not select this value in component
// }

// -----------------------------------------------------------------------------

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
