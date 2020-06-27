import { getNormalizedPrice } from '../utils/math.utils';
import { POTENTIAL_ORDER_UUID } from '../store/reducers/order.reducers';

import { LocalStorage } from './local-storage.model';
import { OrderItem, OrderItemStore } from './order-item.model';
import { Payment, PaymentStore } from './payment.model';
import { DeliveryType, PaymentType, Type } from './product.model';
import { PromoCode, PromoCodeStore } from './promo-code.model';

export enum Status {
  PaymentWait = 'PaymentWait',
  PaymentCompleted = 'PaymentCompleted',
  ReadyForPickup = 'ReadyForPickup',
  Shipped = 'Shipped',
  Completed = 'Completed',
  Canceled = 'Canceled'
}

export interface OrderEntities {
  [uuid: string]: OrderStore;
}

export interface OrderLocalStorage extends LocalStorage {
  entities: OrderEntities;
  lastOrderItemId: number;
}

// -----------------------------------------------------------------------------

export interface OrderStore {
  uuid: string; // uuid to avoid sharing information about e-shop orders amount
  number?: string;
  status?: Status;
  // ---
  isClientDetailsFormActive?: boolean;
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
  isLegalConfirmationChecked?: boolean;
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
  public isLegalConfirmationChecked: boolean;
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
    this.isLegalConfirmationChecked = orderStore.isLegalConfirmationChecked;
    // ---
    this.orderItemsStore = orderStore.orderItemsStore; // TODO move it to separate store feature
    this.paymentsStore = orderStore.paymentsStore; // TODO move it to separate store feature
    this.promoCodeStore = orderStore.promoCodeStore; // TODO move it to separate store feature
    // ---
    this.createdAt = orderStore.createdAt;
    this.updatedAt = orderStore.updatedAt;

    return this;
  }

  // ---

  public isProductSectionValid(): boolean {
    return this.getOrderItemsByType([Type.Product]).length > 0 && this.isProductQuantityWithinTheLimitsInOrderItems();
  }

  public isDeliverySectionValid(): boolean {
    return (
      this.getOrderItemsByType([Type.Delivery]).length === 1 &&
      (this.isParcelLockerActive() ? !!this.parcelLocker : true) &&
      !this.isDeliveryTypeBlockedCourierRuleFails() &&
      !this.isDeliveryTypeBlockedParcelLockerRuleFails()
    );
  }

  public isPaymentSectionValid(): boolean {
    return this.getOrderItemsByType([Type.Payment]).length === 1;
  }

  public isClientDetailsSectionValid(): boolean {
    const deliveryType: DeliveryType = this.getDeliveryType();
    const isFormValid: boolean =
      deliveryType === DeliveryType.InPostCourier
        ? !!(this.email && this.phone && this.name && this.surname && this.address && this.zipCode && this.city)
        : !!(this.email && this.phone && this.name && this.surname);

    return !this.isClientDetailsFormActive && isFormValid;
  }

  public isPromoCodeSectionValid(): boolean {
    return true; // currently it's always valid
  }

  // ---

  public isDeliverySectionDisabled(): boolean {
    return !this.isProductSectionValid();
  }

  public isPaymentSectionDisabled(): boolean {
    return !this.isProductSectionValid() || !this.isDeliverySectionValid();
  }

  public isClientDetailsSectionDisabled(): boolean {
    return !this.isProductSectionValid() || !this.isDeliverySectionValid() || !this.isPaymentSectionValid();
  }

  public isPromoCodeSectionDisabled(): boolean {
    return (
      !this.isProductSectionValid() ||
      !this.isDeliverySectionValid() ||
      !this.isPaymentSectionValid() ||
      !this.isClientDetailsSectionValid()
    );
  }

  public isSummarySectionDisabled(): boolean {
    return (
      !this.isProductSectionValid() ||
      !this.isDeliverySectionValid() ||
      !this.isPaymentSectionValid() ||
      !this.isClientDetailsSectionValid() ||
      !this.isPromoCodeSectionValid()
    );
  }

  // ---

  public isDeliveryTypeBlockedCourierRuleFails(): boolean {
    const deliveryType: DeliveryType = this.getDeliveryType();
    const productOrderItems: OrderItem[] = this.getOrderItemsByType([Type.Product]);
    const numberOfProductsBlockedCourier: number = productOrderItems.reduce(
      (accumulator: number, current: OrderItem): number =>
        accumulator + (current.productStore && current.productStore.isDeliveryBlockedCourier ? 1 : 0),
      0
    );

    return deliveryType === DeliveryType.InPostCourier && numberOfProductsBlockedCourier > 0;
  }

  public isDeliveryTypeBlockedParcelLockerRuleFails(): boolean {
    const deliveryType: DeliveryType = this.getDeliveryType();
    const productOrderItems: OrderItem[] = this.getOrderItemsByType([Type.Product]);
    const numberOfProductsBlockedParcelLocker: number = productOrderItems.reduce(
      (accumulator: number, current: OrderItem): number =>
        accumulator + (current.productStore && current.productStore.isDeliveryBlockedParcelLocker ? 1 : 0),
      0
    );

    return deliveryType === DeliveryType.InPostParcelLocker && numberOfProductsBlockedParcelLocker > 0;
  }

  public isProductQuantityWithinTheLimitsInOrderItems(): boolean {
    const numberOfExceedingProducts: number = this.getOrderItemsByType([Type.Product]).reduce(
      (accumulator: number, current: OrderItem): number => accumulator + (current.isProductQuantityExceeded() ? 1 : 0),
      0
    );

    return numberOfExceedingProducts === 0;
  }

  public isParcelLockerActive(): boolean {
    const deliveryOrderItems: OrderItem[] = this.getOrderItemsByType([Type.Delivery]);

    return (
      deliveryOrderItems.length === 1 &&
      deliveryOrderItems[0].productStore &&
      deliveryOrderItems[0].productStore.deliveryType === DeliveryType.InPostParcelLocker &&
      !this.isDeliveryTypeBlockedParcelLockerRuleFails()
    );
  }

  public isUpdatedAtDifferentThanCreatedAt(): boolean {
    return this.updatedAt.getTime() !== this.createdAt.getTime();
  }

  public isValid(): boolean {
    return (
      this.isProductSectionValid() &&
      this.isDeliverySectionValid() &&
      this.isPaymentSectionValid() &&
      this.isClientDetailsSectionValid() &&
      this.isPromoCodeSectionValid() &&
      this.isLegalConfirmationChecked
    );
  }

  public isExistingOrderPaymentVisible(): boolean {
    return this.status === Status.PaymentWait;
  }

  public isStoredOnTheBackend(): boolean {
    return this.uuid !== POTENTIAL_ORDER_UUID;
  }

  public getDeliveryType(): DeliveryType {
    const deliveryOrderItems: OrderItem[] = this.getOrderItemsByType([Type.Delivery]);

    return deliveryOrderItems.length === 1 && deliveryOrderItems[0].productStore
      ? deliveryOrderItems[0].productStore.deliveryType
      : null;
  }

  public getOrderItemsByType(types: Type[]): OrderItem[] {
    return this.orderItems.filter((orderItem: OrderItem): boolean => types.includes(orderItem.type));
  }

  public getPaymentType(): PaymentType {
    const paymentOrderItems: OrderItem[] = this.getOrderItemsByType([Type.Payment]);

    return paymentOrderItems.length === 1 ? paymentOrderItems[0].paymentType : null;
  }

  public getPayUUrl(): string {
    return this.payments.length === 1 && this.payments[0].paymentType === PaymentType.PayU
      ? this.payments[0].url
      : null;
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
