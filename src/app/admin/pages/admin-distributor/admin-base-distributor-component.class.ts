import { Injectable } from '@angular/core';

import { AdminBaseComponent } from '../admin-base-component.class';
import { AdminCall } from '../../models/admin-component.models';

@Injectable()
export class AdminBaseDistributorComponent extends AdminBaseComponent {
  public distributorAdminCall: AdminCall;
  public distributorWriteRequestAdminCall: AdminCall = this.getAdminCall();

  protected getDistributorWriteRequestBody(distributor: any): any {
    return {
      name: distributor.name
    };
  }

  protected refreshRelations(): void {
    // no relations
  }
}
