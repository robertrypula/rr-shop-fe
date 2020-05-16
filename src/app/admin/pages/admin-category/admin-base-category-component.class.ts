import { Injectable } from '@angular/core';

import { AdminBaseComponent } from '../admin-base-component.class';
import { AdminCall } from '../../models/admin-component.models';

@Injectable()
export class AdminBaseCategoryComponent extends AdminBaseComponent {
  public categoriesAdminCall: AdminCall = this.getAdminCall();
  public categoryAdminCall: AdminCall;
  public categoryWriteRequestAdminCall: AdminCall = this.getAdminCall();

  protected getCategoryWriteRequestBody(category: any): any {
    return {
      content: category.content,
      isHidden: category.isHidden,
      isNotClickable: category.isNotClickable,
      isHiddenListOfProducts: category.isHiddenListOfProducts,
      name: category.name,
      parentId: !category.parentId || category.parentId === 'null' ? null : +category.parentId
    };
  }

  protected refreshRelations(): void {
    this.get(this.categoriesAdminCall, 'category').subscribe();
  }
}
