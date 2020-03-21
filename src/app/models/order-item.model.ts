import { Product } from './product.model';

export enum Type {
  Delivery = 'Delivery',
  Payment = 'Payment',
  Product = 'Product'
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
