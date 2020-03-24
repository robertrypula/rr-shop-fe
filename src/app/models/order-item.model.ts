import { Product } from './product.model';
import { Order } from './order.model';
import { normalizePrice } from '../utils/math.utils';

export enum Type {
  Delivery = 'Delivery',
  Payment = 'Payment',
  Product = 'Product'
}

// -----------------------------------------------------------------------------

export interface OrderItemStore {
  id?: number;
  name?: string;
  priceUnitOriginal?: number;
  priceUnitSelling?: number;
  productId: number;
  quantity: number;
  type: Type;
}

// -----------------------------------------------------------------------------

export class OrderItem implements OrderItemStore {
  public id?: number;
  public name?: string;
  public priceUnitOriginal?: number;
  public priceUnitSelling?: number;
  public productId: number;
  public quantity: number;
  public type: Type;

  public order: Order;
  public product: Product; // TODO this is actually ProductStore, rename it when ProductEnriched will switch to Product

  public fromStore(orderItemStore: OrderItemStore): OrderItem {
    if (!orderItemStore) {
      throw new Error('Empty store object');
    }

    this.id = orderItemStore.id;
    this.name = orderItemStore.name;
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
    return this.getPriceUnitOriginal() * this.quantity;
  }

  public getPriceTotalSelling(): number {
    return this.getPriceUnitSelling() * this.quantity;
  }

  public getPriceUnitOriginal(): number {
    return this.isPriceUnitOriginalComingFromTheBackend()
      ? this.priceUnitOriginal
      : this.product
      ? this.product.priceUnit
      : 0;
  }

  public getPriceUnitSelling(): number {
    return this.isPriceUnitSellingComingFromTheBackend()
      ? this.priceUnitSelling
      : this.product
      ? normalizePrice(
          this.product.priceUnit *
            (this.order && this.order.promoCode ? this.order.promoCode.getDiscountMultiplier() : 1)
        )
      : 0;
  }

  public setOrder(order: Order): OrderItem {
    this.order = order;

    return this;
  }

  protected isPriceUnitOriginalComingFromTheBackend(): boolean {
    return !!this.priceUnitOriginal || this.priceUnitOriginal === 0;
  }

  protected isPriceUnitSellingComingFromTheBackend(): boolean {
    return !!this.priceUnitSelling || this.priceUnitSelling === 0;
  }
}
