import { StructuralNode } from './models/category.model';
import { Device } from './models/viewport.model';

export const CURRENCY = 'zł'; // TODO make it dynamic in future
export const CLOUD_HIDE_DELAY = 2000;
export const CLOUD_SHOW_DELAY = 250;
export const ORDER_BAR_SUCCESS_MESSAGE_HIDE_DELAY = 800;
export const H1_TEXT = 'Waleriana.pl - Twoja zielarnia';

export const MAIN_PAGE_PRODUCTS_IN_SECTION_LIMIT = 8;

export const GRID_MOBILE = 500;
export const GRID_TABLET = 768;
export const GRID_DESKTOP_MEDIUM = 992;
export const GRID_DESKTOP_LARGE = 1200;
export const GRID_DESKTOP_EXTRA_LARGE = 1700;

export const HEADER_FIXED_MOBILE_VERTICAL_THRESHOLD = 111;
export const HEADER_FIXED_MOBILE_THRESHOLD = 131;
export const HEADER_FIXED_TABLET_THRESHOLD = 155;
export const HEADER_FIXED_DESKTOP_MEDIUM_THRESHOLD = 170;
export const HEADER_FIXED_DESKTOP_LARGE_THRESHOLD = 170;
export const HEADER_FIXED_DESKTOP_EXTRA_LARGE_THRESHOLD = 170;

export const BREADCRUMBS_STRUCTURAL_NODES_LIMIT = [
  StructuralNode.Footer,
  StructuralNode.Header,
  StructuralNode.ShopCategories
];

export const SMALL_DEVICE_DEFINITION = [Device.MobileVertical, Device.Mobile];
