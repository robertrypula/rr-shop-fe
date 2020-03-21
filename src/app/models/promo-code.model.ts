import { Order } from './order.model';

export interface PromoCodeStore {
  name: string;
  percentageDiscount: number;
}

// -----------------------------------------------------------------------------

export class PromoCode implements PromoCodeStore {
  public name: string;
  public percentageDiscount: number;

  public order: Order;

  public fromStore(promoCodeStore: PromoCodeStore): PromoCode {
    if (!promoCodeStore) {
      throw new Error('Empty store object');
    }

    this.name = promoCodeStore.name;
    this.percentageDiscount = promoCodeStore.percentageDiscount;

    return this;
  }

  public setOrder(order: Order): PromoCode {
    this.order = order;

    return this;
  }
}
