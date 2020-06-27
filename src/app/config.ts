import { StructuralNode } from './models/category.model';
import { Device } from './models/viewport.model';

export const ADMIN_SESSION_WARNING_CLOSE_TO_EXPIRE = 10 * 60;
export const ADMIN_SESSION_WARNING_LAST_MOMENTS = 10;

export const CURRENCY = 'zł'; // TODO make it dynamic in future
export const CLOUD_HIDE_DELAY = 2000;
export const CLOUD_SHOW_DELAY = 250;
export const BAR_SUCCESS_MESSAGE_HIDE_DELAY = 800;
export const H1_TEXT = 'Waleriana.pl - internetowy sklep zielarsko-medyczny';

export const CATEGORY_RELATED_PRODUCTS_LIMIT = 4;
export const MAIN_PAGE_PRODUCTS_IN_SECTION_LIMIT = 8;

export const GRID_MOBILE_HORIZONTAL = 500;
export const GRID_TABLET = 768;
export const GRID_DESKTOP_MEDIUM = 992;
export const GRID_DESKTOP_LARGE = 1200;
export const GRID_DESKTOP_EXTRA_LARGE = 1700;

export const HEADER_STICKY_MOBILE_VERTICAL_THRESHOLD = 111;
export const HEADER_STICKY_MOBILE_HORIZONTAL_THRESHOLD = 131;
export const HEADER_STICKY_TABLET_THRESHOLD = 183;
export const HEADER_STICKY_DESKTOP_MEDIUM_THRESHOLD = 69;
export const HEADER_STICKY_DESKTOP_LARGE_THRESHOLD = 69;
export const HEADER_STICKY_DESKTOP_EXTRA_LARGE_THRESHOLD = 69;

export const SLIDER_INTERVAL = 3500;

export const BREADCRUMBS_STRUCTURAL_NODES_LIMIT = [
  StructuralNode.Footer,
  StructuralNode.Header,
  StructuralNode.ShopCategories
];

export const SMALL_DEVICE_DEFINITION = [Device.MobileVertical, Device.MobileHorizontal];
