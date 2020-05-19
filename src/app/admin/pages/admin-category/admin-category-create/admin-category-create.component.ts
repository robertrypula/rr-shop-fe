import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AdminBaseCategoryComponent } from '../admin-base-category-component.class';
import { AdminCall } from '../../../models/admin-component.models';

@Component({
  selector: 'rr-shop-admin-category-create',
  templateUrl: './admin-category-create.component.html',
  styleUrls: ['./admin-category-create.component.scss']
})
export class AdminCategoryCreateComponent extends AdminBaseCategoryComponent implements OnInit {
  public categoryAdminCall: AdminCall = this.getAdminCall({
    content: '',
    contentShort: '',
    id: null,
    isHidden: true,
    isHiddenListOfProducts: false,
    isNotClickable: false,
    isVisibleListOfCategories: false,
    linkId: null,
    linkOpenInNewTab: false,
    linkText: '',
    name: '',
    parentId: null,
    slug: '',
    structuralNode: null,
    sortOrder: 0
  });

  public ngOnInit(): void {
    this.refresh();
  }

  public refresh(): void {
    this.refreshRelations();
  }

  public create(): void {
    if (confirm('Czy na pewno?')) {
      this.post(
        this.categoryWriteRequestAdminCall,
        `category`,
        this.getCategoryWriteRequestBody(this.categoryAdminCall.data)
      )
        .pipe(
          tap(() => {
            this.router.navigate(['/admin/category', this.categoryWriteRequestAdminCall.data.id]).then();
          })
        )
        .subscribe();
    }
  }
}
