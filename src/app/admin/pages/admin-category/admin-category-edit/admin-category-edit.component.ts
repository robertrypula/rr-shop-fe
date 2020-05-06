import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AdminBaseComponent } from '../../admin-base-component.class';
import { AdminCall } from '../../../models/admin-component.models';
import {
  ClickableActionTheme,
  ClickableActionType
} from '../../../../components/clickable-action/clickable-action.model';

@Component({
  selector: 'rr-shop-admin-category-edit',
  templateUrl: './admin-category-edit.component.html',
  styleUrls: ['./admin-category-edit.component.scss']
})
export class AdminCategoryEditComponent extends AdminBaseComponent implements OnInit {
  public categories: AdminCall = this.getAdminCall();
  public category: AdminCall = this.getAdminCall();
  public categoryWriteRequest: AdminCall = this.getAdminCall();

  public readonly ClickableActionTheme = ClickableActionTheme;
  public readonly ClickableActionType = ClickableActionType;

  public ngOnInit(): void {
    this.refresh();
  }

  public refresh(): void {
    this.get(this.category, `category/${this.route.snapshot.paramMap.get('id')}`).subscribe();
    this.get(this.categories, 'category').subscribe();
  }

  public save(): void {
    if (confirm('Czy na pewno?')) {
      this.patch(
        this.categoryWriteRequest,
        `category/${this.route.snapshot.paramMap.get('id')}`,
        this.getCategoryPatchBody()
      )
        .pipe(
          tap(() => {
            this.refresh();
          })
        )
        .subscribe();
    }
  }

  protected getCategoryPatchBody(): any {
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
