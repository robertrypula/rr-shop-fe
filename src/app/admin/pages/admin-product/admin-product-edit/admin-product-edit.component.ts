import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AdminBaseProductComponent } from '../admin-base-product-component.class';
import { AdminCall } from '../../../models/admin-component.models';

@Component({
  selector: 'rr-shop-admin-product-edit',
  templateUrl: './admin-product-edit.component.html',
  styleUrls: ['./admin-product-edit.component.scss']
})
export class AdminProductEditComponent extends AdminBaseProductComponent implements OnInit {
  public productAdminCall: AdminCall = this.getAdminCall();

  public ngOnInit(): void {
    this.refresh();
  }

  public refresh(): void {
    this.get(this.productAdminCall, `product/${this.route.snapshot.paramMap.get('id')}`).subscribe();
    this.refreshRelations();
  }

  public save(): void {
    if (confirm('Czy na pewno?')) {
      this.patch(
        this.productWriteRequestAdminCall,
        `product/${this.route.snapshot.paramMap.get('id')}`,
        this.getProductWriteRequestBody(this.productAdminCall.data)
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
