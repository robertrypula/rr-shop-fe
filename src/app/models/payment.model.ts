import { Order } from './order.model';
import { PaymentType } from './product.model';

export interface PaymentStore {
  uuid: string;
  amount: number;
  paymentType: PaymentType;
  url: string;
}

// -----------------------------------------------------------------------------

export class Payment implements PaymentStore {
  public uuid: string;
  public amount: number;
  public paymentType: PaymentType;
  public url: string;

  public order: Order;

  public fromStore(paymentStore: PaymentStore): Payment {
    if (!paymentStore) {
      throw new Error('Empty store object');
    }

    this.uuid = paymentStore.uuid;
    this.amount = paymentStore.amount;
    this.paymentType = paymentStore.paymentType;
    this.url = paymentStore.url;

    return this;
  }

  public setOrder(order: Order): Payment {
    this.order = order;

    return this;
  }
}
