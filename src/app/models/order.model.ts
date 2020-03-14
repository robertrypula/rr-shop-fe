import { Product } from './product.model';

export enum Type {
  Delivery = 'Delivery',
  Payment = 'Payment',
  Product = 'Product'
}

export enum Status {
  PaymentWait = 'PaymentWait',
  PaymentCompleted = 'PaymentCompleted',
  Shipped = 'Shipped',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

// -----------------------------------------------------------------------------

export interface OrderItemStore {
  id?: number;
  nameOriginal?: string;
  priceUnitOriginal?: number;
  priceUnitSelling?: number;
  productId: number;
  quantity: number;
  type: Type;
}

export interface OrderStore {
  uuid: string; // uuid to avoid sharing information about e-shop orders amount
  number?: string;
  status?: Status;
  // ---
  email?: string;
  phone?: string;
  name?: string;
  surname?: string;
  address?: string;
  zipCode?: string;
  city?: string;
  comments?: string;
  parcelLocker?: string;
  paymentUrl?: string;
  // ---
  orderItemsStore?: { [key: string]: OrderItemStore }; // TODO move it to separate store feature
}

// -----------------------------------------------------------------------------

export interface OrderItem extends OrderItemStore {
  isQuantityDecrementActive: boolean;
  product: Product;
  totalPrice: number;
}

export interface Order extends OrderStore {
  isBasketEmpty: boolean;
  isValid: boolean;
  orderItems: OrderItem[];
  priceTotal: number;
  priceTotalDelivery: number;
  priceTotalPayment: number;
  priceTotalProduct: number;
  quantityTotalProduct: number;
}
