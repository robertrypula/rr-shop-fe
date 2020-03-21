import { PromoCode, PromoCodeStore } from './promo-code.model';
import { OrderItem, OrderItemStore } from './order-item.model';

export enum Status {
  PaymentWait = 'PaymentWait',
  PaymentCompleted = 'PaymentCompleted',
  Shipped = 'Shipped',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

// -----------------------------------------------------------------------------

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
  promoCodeTextField?: string;
  promoCodeStore?: PromoCodeStore; // TODO move it to separate store feature
  orderItemsStore?: { [key: string]: OrderItemStore }; // TODO move it to separate store feature
}

// -----------------------------------------------------------------------------

export interface Order extends OrderStore {
  isBasketEmpty: boolean;
  isValid: boolean;
  orderItems: OrderItem[];
  priceTotalAllOriginal: number;
  priceTotalAllSelling: number;
  priceTotalDeliveryOriginal: number;
  priceTotalDeliverySelling: number;
  priceTotalPaymentOriginal: number;
  priceTotalPaymentSelling: number;
  priceTotalProductOriginal: number;
  priceTotalProductSelling: number;
  promoCode: PromoCode;
  quantityTotalProduct: number;
}
