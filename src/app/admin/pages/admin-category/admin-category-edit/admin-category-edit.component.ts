import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AdminBaseCategoryComponent } from '../admin-base-category-component.class';
import { AdminCall } from '../../../models/admin-component.models';

@Component({
  selector: 'rr-shop-admin-category-edit',
  templateUrl: './admin-category-edit.component.html',
  styleUrls: ['./admin-category-edit.component.scss']
})
export class AdminCategoryEditComponent extends AdminBaseCategoryComponent implements OnInit {
  public categoryAdminCall: AdminCall = this.getAdminCall();

  public ngOnInit(): void {
    this.refresh();
  }

  public refresh(): void {
    this.get(this.categoryAdminCall, `category/${this.route.snapshot.paramMap.get('id')}`).subscribe();
    this.refreshRelations();
  }

  public save(): void {
    if (confirm('Czy na pewno?')) {
      this.patch(
        this.categoryWriteRequestAdminCall,
        `category/${this.route.snapshot.paramMap.get('id')}`,
        this.getCategoryWriteRequestBody(this.categoryAdminCall.data)
      )
        .pipe(
          tap(() => {
            this.refresh();
          })
        )
        .subscribe();
    }
  }
}
