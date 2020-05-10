import { Injectable } from '@angular/core';

import { AdminBaseComponent } from '../admin-base-component.class';
import { AdminCall } from '../../models/admin-component.models';

@Injectable()
export class AdminBaseProductComponent extends AdminBaseComponent {
  public productAdminCall: AdminCall;
  public productWriteRequestAdminCall: AdminCall = this.getAdminCall();

  protected getProductWriteRequestBody(product: any): any {
    return {
      name: product.name,
      description: product.description,
      priceUnit: product.priceUnit,
      notes: product.notes,
      isHidden: product.isHidden
    };
  }

  protected refreshRelations(): void {
    // no relations
  }
}
