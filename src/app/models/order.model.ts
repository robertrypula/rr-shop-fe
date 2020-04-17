import { PromoCode, PromoCodeStore } from './promo-code.model';
import { OrderItem, OrderItemStore } from './order-item.model';
import { getNormalizedPrice } from '../utils/math.utils';
import { PaymentType, Type } from './product.model';
import { Payment, PaymentStore } from './payment.model';

export enum Status {
  PaymentWait = 'PaymentWait',
  PaymentCompleted = 'PaymentCompleted',
  ReadyForPickup = 'ReadyForPickup',
  Shipped = 'Shipped',
  Completed = 'Completed',
  Canceled = 'Canceled'
}

// -----------------------------------------------------------------------------

export interface OrderStore {
  uuid: string; // uuid to avoid sharing information about e-shop orders amount
  number?: string;
  status?: Status;
  // ---
  isClientDetailsFormActive?: boolean;
  isClientDetailsFormValid?: boolean;
  email?: string;
  phone?: string;
  name?: string;
  surname?: string;
  address?: string;
  zipCode?: string;
  city?: string;
  comments?: string;
  // ---
  parcelLocker?: string;
  parcelNumber?: string;
  promoCodeTextField?: string;
  // ---
  orderItemsStore?: { [uuid: string]: OrderItemStore }; // TODO move it to separate store feature
  paymentsStore?: { [uuid: string]: PaymentStore }; // TODO move it to separate store feature
  promoCodeStore?: PromoCodeStore; // TODO move it to separate store feature
  // ---
  createdAt?: Date;
  updatedAt?: Date;
}

// -----------------------------------------------------------------------------

export class Order implements OrderStore {
  public uuid: string;
  public number: string;
  public status: Status;
  // ---
  public isClientDetailsFormActive: boolean;
  public isClientDetailsFormValid: boolean;
  public email: string;
  public phone?: string;
  public name?: string;
  public surname?: string;
  public address?: string;
  public zipCode?: string;
  public city?: string;
  public comments?: string;
  // ---
  public parcelLocker?: string;
  public parcelNumber?: string;
  public promoCodeTextField?: string;
  // ---
  public orderItemsStore?: { [uuid: string]: OrderItemStore }; // TODO move it to separate store feature
  public paymentsStore?: { [uuid: string]: PaymentStore }; // TODO move it to separate store feature
  public promoCodeStore?: PromoCodeStore; // TODO move it to separate store feature
  // ---
  public createdAt: Date;
  public updatedAt: Date;

  // ---------------

  public orderItems: OrderItem[];
  public payments: Payment[];
  public promoCode: PromoCode;

  public fromStore(orderStore: OrderStore): Order {
    if (!orderStore) {
      throw new Error('Empty store object');
    }

    this.uuid = orderStore.uuid;
    this.number = orderStore.number;
    this.status = orderStore.status;
    // ---
    this.isClientDetailsFormActive = orderStore.isClientDetailsFormActive;
    this.isClientDetailsFormValid = orderStore.isClientDetailsFormValid;
    this.email = orderStore.email;
    this.phone = orderStore.phone;
    this.name = orderStore.name;
    this.surname = orderStore.surname;
    this.address = orderStore.address;
    this.zipCode = orderStore.zipCode;
    this.city = orderStore.city;
    this.comments = orderStore.comments;
    // ---
    this.parcelLocker = orderStore.parcelLocker;
    this.parcelNumber = orderStore.parcelNumber;
    this.promoCodeTextField = orderStore.promoCodeTextField;
    // ---
    this.orderItemsStore = orderStore.orderItemsStore; // TODO move it to separate store feature
    this.paymentsStore = orderStore.paymentsStore; // TODO move it to separate store feature
    this.promoCodeStore = orderStore.promoCodeStore; // TODO move it to separate store feature
    // ---
    this.createdAt = orderStore.createdAt;
    this.updatedAt = orderStore.updatedAt;

    return this;
  }

  public isOrderItemsListEmpty(types: Type[]): boolean {
    return this.getOrderItemsByType(types).length === 0;
  }

  public isValid(): boolean {
    return (
      this.isClientDetailsFormValid &&
      this.getOrderItemsByType([Type.Product]).length > 0 &&
      this.getOrderItemsByType([Type.Delivery]).length === 1 &&
      this.getOrderItemsByType([Type.Payment]).length === 1
    );
  }

  public getOrderItemsByType(types: Type[]): OrderItem[] {
    return this.orderItems.filter((orderItem: OrderItem): boolean => types.includes(orderItem.type));
  }

  public getDeliveryOrderItem(): OrderItem {
    const deliveries: OrderItem[] = this.getOrderItemsByType([Type.Delivery]);

    return deliveries.length === 1 ? deliveries[0] : null;
  }

  public getPaymentOrderItem(): OrderItem {
    const payments: OrderItem[] = this.getOrderItemsByType([Type.Payment]);

    return payments.length === 1 ? payments[0] : null;
  }

  public getPriceTotalOriginal(types: Type[]): number {
    return getNormalizedPrice(
      this.getOrderItemsByType(types).reduce(
        (accumulator: number, orderItem: OrderItem): number => accumulator + orderItem.getPriceTotalOriginal(),
        0
      )
    );
  }

  public getPriceTotalSelling(types: Type[]): number {
    return getNormalizedPrice(
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
