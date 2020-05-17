import { Injectable } from '@angular/core';

import { AdminBaseComponent } from '../admin-base-component.class';
import { AdminCall } from '../../models/admin-component.models';

@Injectable()
export class AdminBaseProductComponent extends AdminBaseComponent {
  public categoriesAdminCall: AdminCall = this.getAdminCall();
  public distributorsAdminCall: AdminCall = this.getAdminCall();
  public manufacturersAdminCall: AdminCall = this.getAdminCall();
  public productAdminCall: AdminCall;
  public productWriteRequestAdminCall: AdminCall = this.getAdminCall();

  protected getProductWriteRequestBody(product: any): any {
    return {
      categoryIds: product.categoryIds || [],
      description: product.description,
      descriptionDelivery: product.descriptionDelivery,
      distributorId: !product.distributorId || product.distributorId === 'null' ? null : +product.distributorId,
      isDeliveryBlockedCourier: product.isDeliveryBlockedCourier,
      isDeliveryBlockedParcelLocker: product.isDeliveryBlockedParcelLocker,
      isHidden: product.isHidden,
      manufacturerId: !product.manufacturerId || product.manufacturerId === 'null' ? null : +product.manufacturerId,
      name: product.name,
      nameCashRegister: product.nameCashRegister,
      notes: product.notes,
      priceUnit: product.priceUnit,
      priceUnitBeforePromotion: product.priceUnitBeforePromotion,
      tags: product.tags
    };
  }

  protected refreshRelations(): void {
    this.get(this.categoriesAdminCall, 'category').subscribe();
    this.get(this.distributorsAdminCall, 'distributor').subscribe();
    this.get(this.manufacturersAdminCall, 'manufacturer').subscribe();
  }
}
