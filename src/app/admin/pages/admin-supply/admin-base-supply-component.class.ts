import { Injectable } from '@angular/core';

import { AdminBaseComponent } from '../admin-base-component.class';
import { AdminCall } from '../../models/admin-component.models';

@Injectable()
export class AdminBaseSupplyComponent extends AdminBaseComponent {
  public productsAdminCall: AdminCall = this.getAdminCall();
  public supplyAdminCall: AdminCall;
  public supplyWriteRequestAdminCall: AdminCall = this.getAdminCall();

  protected getSupplyWriteRequestBody(supply: any): any {
    const object: any = {
      bestBefore: supply.bestBefore,
      isUnavailable: supply.isUnavailable,
      notes: supply.notes,
      priceUnitGross: supply.priceUnitGross,
      productId: !supply.productId || supply.productId === 'null' ? null : +supply.productId,
      vat: supply.vat
    };

    this.setSessionStorageKey('adminBestBefore', object.bestBefore);
    this.setSessionStorageKey('adminPriceUnitGross', object.priceUnitGross);
    this.setSessionStorageKey('adminProductId', object.productId);
    this.setSessionStorageKey('adminVat', object.vat);

    return object;
  }

  protected refreshRelations(): void {
    this.get(this.productsAdminCall, 'product').subscribe();
  }
}
