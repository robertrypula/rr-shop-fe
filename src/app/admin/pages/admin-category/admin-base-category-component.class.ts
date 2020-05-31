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
      contentShort: category.contentShort,
      isHidden: category.isHidden,
      isHiddenListOfProducts: category.isHiddenListOfProducts,
      isNotClickable: category.isNotClickable,
      isVisibleListOfCategories: category.isVisibleListOfCategories,
      linkId: !category.linkId || category.linkId === 'null' ? null : +category.linkId,
      linkOpenInNewTab: category.linkOpenInNewTab,
      linkText: category.linkText,
      name: category.name,
      parentId: !category.parentId || category.parentId === 'null' ? null : +category.parentId,
      sortOrder: category.sortOrder
    };
  }

  protected refreshRelations(): void {
    this.get(this.categoriesAdminCall, 'category').subscribe();
  }
}
