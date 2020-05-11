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
    /*
                      externalId: number;
                      name: string;
                      tags: string;
                      nameCashRegister: string;
                      slug: string;
                      description: string;
                      priceUnit: number;
                      priceUnitBeforePromotion: number;
                      notes: string;
                      isHidden: boolean;
      distributor: Distributor;
      manufacturer: Manufacturer;
      categories: Category[];
    */

    return {
      name: product.name,
      description: product.description,
      priceUnit: product.priceUnit,
      notes: product.notes,
      isHidden: product.isHidden,
      manufacturerId: !product.manufacturerId || product.manufacturerId === 'null' ? null : +product.manufacturerId,
      distributor: !product.distributorId || product.distributorId === 'null' ? null : +product.distributorId
    };
  }

  protected refreshRelations(): void {
    this.get(this.categoriesAdminCall, 'category').subscribe();
    this.get(this.distributorsAdminCall, 'distributor').subscribe();
    this.get(this.manufacturersAdminCall, 'manufacturer').subscribe();
  }
}
