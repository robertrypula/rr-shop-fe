import { Injectable } from '@angular/core';

import { AdminBaseComponent } from '../admin-base-component.class';
import { AdminCall } from '../../models/admin-component.models';

@Injectable()
export class AdminBaseSupplyComponent extends AdminBaseComponent {
  public supplyAdminCall: AdminCall;
  public supplyWriteRequestAdminCall: AdminCall = this.getAdminCall();

  protected getSupplyWriteRequestBody(supply: any): any {
    return {
      name: supply.name
    };
  }

  protected refreshRelations(): void {
    // no relations
  }
}
