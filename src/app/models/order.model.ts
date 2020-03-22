import { PromoCode, PromoCodeStore } from './promo-code.model';
import { OrderItem, OrderItemStore, Type } from './order-item.model';
import { normalizePrice } from '../utils/math.utils';

export enum Status {
  PaymentWait = 'PaymentWait',
  PaymentCompleted = 'PaymentCompleted',
  ReadyForPickup = 'ReadyForPickup',
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

export class Order implements OrderStore {
  public uuid: string;
  public number: string;
  public status: Status;
  // ---
  public email: string;
  public phone?: string;
  public name?: string;
  public surname?: string;
  public address?: string;
  public zipCode?: string;
  public city?: string;
  public comments?: string;
  public parcelLocker?: string;
  public paymentUrl?: string;
  // ---
  public promoCodeTextField?: string;
  public promoCodeStore?: PromoCodeStore; // TODO move it to separate store feature
  public orderItemsStore?: { [key: string]: OrderItemStore }; // TODO move it to separate store feature

  // ---------------

  public orderItems: OrderItem[];
  public promoCode: PromoCode;

  public fromStore(orderStore: OrderStore): Order {
    if (!orderStore) {
      throw new Error('Empty store object');
    }

    this.uuid = orderStore.uuid;
    this.number = orderStore.number;
    this.status = orderStore.status;
    // ---
    this.email = orderStore.email;
    this.phone = orderStore.phone;
    this.name = orderStore.name;
    this.surname = orderStore.surname;
    this.address = orderStore.address;
    this.zipCode = orderStore.zipCode;
    this.city = orderStore.city;
    this.comments = orderStore.comments;
    this.parcelLocker = orderStore.parcelLocker;
    this.paymentUrl = orderStore.paymentUrl;
    // ---
    this.promoCodeTextField = orderStore.promoCodeTextField;
    this.promoCodeStore = orderStore.promoCodeStore; // TODO move it to separate store feature
    this.orderItemsStore = orderStore.orderItemsStore; // TODO move it to separate store feature

    return this;
  }

  public isBasketEmpty(): boolean {
    return this.getOrderItemsByType([Type.Product]).length === 0;
  }

  public isValid(): boolean {
    return (
      this.getOrderItemsByType([Type.Product]).length > 0 &&
      this.getOrderItemsByType([Type.Delivery]).length === 1 &&
      this.getOrderItemsByType([Type.Payment]).length === 1
    );
  }

  public getOrderItemsByType(types: Type[]): OrderItem[] {
    return this.orderItems.filter((orderItem: OrderItem): boolean => types.includes(orderItem.type));
  }

  public getPriceTotalOriginal(types: Type[]): number {
    return normalizePrice(
      this.getOrderItemsByType(types).reduce(
        (accumulator: number, orderItem: OrderItem): number => accumulator + orderItem.getPriceTotalOriginal(),
        0
      )
    );
  }

  public getPriceTotalSelling(types: Type[]): number {
    return normalizePrice(
      this.getOrderItemsByType(types).reduce(
        (accumulator: number, orderItem: OrderItem): number => accumulator + orderItem.getPriceTotalSelling(),
        0
      )
    );
  }

  public getQuantityTotal(types: Type[]): number {
    return this.getOrderItemsByType(types).reduce(
      (accumulator: number, orderItem: OrderItem): number => accumulator + orderItem.quantity,
      0
    );
  }
}
