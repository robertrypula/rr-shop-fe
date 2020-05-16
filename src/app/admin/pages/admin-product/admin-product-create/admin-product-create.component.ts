import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AdminBaseProductComponent } from '../admin-base-product-component.class';
import { AdminCall } from '../../../models/admin-component.models';

@Component({
  selector: 'rr-shop-admin-product-create',
  templateUrl: './admin-product-create.component.html',
  styleUrls: ['./admin-product-create.component.scss']
})
export class AdminProductCreateComponent extends AdminBaseProductComponent implements OnInit {
  public productAdminCall: AdminCall = this.getAdminCall({
    categories: [],
    description: null,
    descriptionDelivery: null,
    distributor: null,
    externalId: null,
    id: null,
    isDeliveryOnlyOwn: true,
    isHidden: true,
    manufacturer: null,
    name: null,
    nameCashRegister: null,
    notes: null,
    priceUnit: null,
    priceUnitBeforePromotion: null,
    slug: null,
    tags: null
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
        this.productWriteRequestAdminCall,
        `product`,
        this.getProductWriteRequestBody(this.productAdminCall.data)
      )
        .pipe(
          tap(() => {
            this.router.navigate(['/admin/product', this.productWriteRequestAdminCall.data.id]).then();
          })
        )
        .subscribe();
    }
  }
}
