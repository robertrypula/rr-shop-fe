import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AdminBaseComponent } from '../admin-base-component.class';
import { AdminCall } from '../../models/admin-component.models';

@Component({
  selector: 'rr-shop-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent extends AdminBaseComponent implements OnInit {
  public category: AdminCall = this.getAdminCall();
  public categorySave: AdminCall = this.getAdminCall();

  public ngOnInit(): void {
    this.refresh();
  }

  public refresh(): void {
    this.get(this.category, `category/${this.route.snapshot.paramMap.get('id')}`).subscribe();
  }

  public save(): void {
    if (confirm('Czy na pewno?')) {
      this.patch(this.categorySave, `category/${this.route.snapshot.paramMap.get('id')}`, this.getCategoryPatchBody())
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
      name: category.name,
      content: category.content,
      isHidden: category.isHidden
    };
  }
}
