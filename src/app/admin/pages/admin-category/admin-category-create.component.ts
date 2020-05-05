import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AdminBaseComponent } from '../admin-base-component.class';
import { AdminCall } from '../../models/admin-component.models';
import { ClickableActionTheme, ClickableActionType } from '../../../components/clickable-action/clickable-action.model';

@Component({
  selector: 'rr-shop-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryCreateComponent extends AdminBaseComponent implements OnInit {
  public categories: AdminCall = this.getAdminCall();
  public category: AdminCall = this.getAdminCall({
    content: '',
    id: null,
    isHidden: true,
    isNotClickable: false,
    isWithoutProducts: false,
    name: '',
    parentId: null,
    slug: '',
    structuralNode: null
  });
  public categoryWriteRequest: AdminCall = this.getAdminCall();
  public isEdit = false;

  public readonly ClickableActionTheme = ClickableActionTheme;
  public readonly ClickableActionType = ClickableActionType;

  public ngOnInit(): void {
    this.refresh();
  }

  public refresh(): void {
    this.get(this.categories, 'category').subscribe();
  }

  public create(): void {
    if (confirm('Czy na pewno?')) {
      this.post(this.categoryWriteRequest, `category`, this.getCategoryPostBody())
        .pipe(
          tap(() => {
            this.router.navigate(['/admin/category', this.categoryWriteRequest.data.id]).then();
          })
        )
        .subscribe();
    }
  }

  protected getCategoryPostBody(): any {
    const category: any = this.category.data;

    return {
      content: category.content,
      isHidden: category.isHidden,
      isNotClickable: category.isNotClickable,
      isWithoutProducts: category.isWithoutProducts,
      name: category.name,
      parentId: !category.parentId || category.parentId === 'null' ? null : +category.parentId
    };
  }
}
