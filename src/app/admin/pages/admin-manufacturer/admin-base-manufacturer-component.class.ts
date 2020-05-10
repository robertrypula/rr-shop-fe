import { Injectable } from '@angular/core';

import { AdminBaseComponent } from '../admin-base-component.class';
import { AdminCall } from '../../models/admin-component.models';

@Injectable()
export class AdminBaseManufacturerComponent extends AdminBaseComponent {
  public manufacturerAdminCall: AdminCall;
  public manufacturerWriteRequestAdminCall: AdminCall = this.getAdminCall();

  protected getManufacturerWriteRequestBody(manufacturer: any): any {
    return {
      name: manufacturer.name
    };
  }

  protected refreshRelations(): void {
    // no relations
  }
}
