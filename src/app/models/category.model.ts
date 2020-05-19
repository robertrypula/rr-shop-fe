export enum StructuralNode {
  Articles = 'Articles',
  BestSellers = 'BestSellers',
  Contact = 'Contact',
  CustomersOpinion = 'CustomersOpinion',
  Delivery = 'Delivery',
  EmailTemplates = 'EmailTemplates',
  Footer = 'Footer',
  FooterMap = 'FooterMap',
  Header = 'Header',
  MainPageCategories = 'MainPageCategories',
  MainPageSlider = 'MainPageSlider',
  News = 'News',
  PageTemplates = 'PageTemplates',
  Payment = 'Payment',
  PrivacyPolicy = 'PrivacyPolicy',
  Promotions = 'Promotions',
  Recommended = 'Recommended',
  Regulations = 'Regulations',
  ShopCategories = 'ShopCategories'
}

export interface ActiveLevelUpdateEntry {
  activeLevel: number;
  id: number;
}

// -----------------------------------------------------------------------------

export interface CategoryStore {
  activeLevel?: number; // not from BE - it's calculated on the frontend side
  content?: string;
  contentShort?: string;
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
  sortOrder?: number;
  structuralNode?: StructuralNode;
}

// -----------------------------------------------------------------------------

// TODO refactor Category models and store
// export interface Category extends CategoryStore {
//   productsCount: number; // TODO calculate products count in the store, not select this value in component
// }
