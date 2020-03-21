import { Product } from './product.model';
import { PromoCode, PromoCodeStore } from './promo-code.model';

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
  promoCodeTextField?: string;
  promoCodeStore?: PromoCodeStore; // TODO move it to separate store feature
  orderItemsStore?: { [key: string]: OrderItemStore }; // TODO move it to separate store feature
}

// -----------------------------------------------------------------------------

export class OrderItem implements OrderItemStore {
  public id?: number;
  public nameOriginal?: string;
  public priceUnitOriginal?: number;
  public priceUnitSelling?: number;
  public productId: number;
  public quantity: number;
  public type: Type;

  public product: Product; // TODO this is actually ProductStore, rename it when ProductEnriched will switch to Product

  public fromStore(orderItemStore: OrderItemStore): OrderItem {
    if (!orderItemStore) {
      throw new Error('Empty store object');
    }

    this.id = orderItemStore.id;
    this.nameOriginal = orderItemStore.nameOriginal;
    this.priceUnitOriginal = orderItemStore.priceUnitOriginal;
    this.priceUnitSelling = orderItemStore.priceUnitSelling;
    this.productId = orderItemStore.productId;
    this.quantity = orderItemStore.quantity;
    this.type = orderItemStore.type;

    return this;
  }

  public isQuantityDecrementActive(): boolean {
    return this.quantity > 1;
  }

  public getPriceTotalOriginal(): number {
    return (this.product ? this.product.priceUnit : 0) * this.quantity;
  }

  public getPriceTotalSelling(): number {
    return (this.product ? this.product.priceUnit : 0) * this.quantity;
  }
}

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
