import { Injectable } from '@angular/core';

import { AdminBaseComponent } from '../admin-base-component.class';
import { AdminCall } from '../../models/admin-component.models';

@Injectable()
export class AdminBaseImageComponent extends AdminBaseComponent {
  public categoriesAdminCall: AdminCall = this.getAdminCall();
  public manufacturersAdminCall: AdminCall = this.getAdminCall();
  public productsAdminCall: AdminCall = this.getAdminCall();
  public imageAdminCall: AdminCall;
  public imageWriteRequestAdminCall: AdminCall = this.getAdminCall();

  protected getImageWriteRequestBody(image: any): any {
    return {
      categoryId: !image.categoryId || image.categoryId === 'null' ? null : +image.categoryId,
      filename: image.filename,
      manufacturerId: !image.manufacturerId || image.manufacturerId === 'null' ? null : +image.manufacturerId,
      productId: !image.productId || image.productId === 'null' ? null : +image.productId,
      sortOrder: image.sortOrder
    };
  }

  protected refreshRelations(): void {
    this.get(this.categoriesAdminCall, 'category').subscribe();
    this.get(this.manufacturersAdminCall, 'manufacturer').subscribe();
    this.get(this.productsAdminCall, 'product').subscribe();
  }
}
