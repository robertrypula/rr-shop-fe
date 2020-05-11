import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AdminBaseSupplyComponent } from '../admin-base-supply-component.class';
import { AdminCall } from '../../../models/admin-component.models';

@Component({
  selector: 'rr-shop-admin-supply-create',
  templateUrl: './admin-supply-create.component.html',
  styleUrls: ['./admin-supply-create.component.scss']
})
export class AdminSupplyCreateComponent extends AdminBaseSupplyComponent implements OnInit {
  public supplyAdminCall: AdminCall = this.getAdminCall({
    bestBefore: this.getSessionStorageKey('adminBestBefore', this.getTodayNoon().toISOString()),
    id: null,
    isUnavailable: false,
    notes: null,
    priceUnitGross: this.getSessionStorageKey('adminPriceUnitGross'),
    productId: this.getSessionStorageKey('adminProductId'),
    vat: this.getSessionStorageKey('adminVat')
  });

  public ngOnInit(): void {
    this.refresh();
  }

  public refresh(): void {
    this.refreshRelations();
  }

  public create(): void {
    if (confirm('Czy na pewno?')) {
      this.post(this.supplyWriteRequestAdminCall, `supply`, this.getSupplyWriteRequestBody(this.supplyAdminCall.data))
        .pipe(
          tap(() => {
            this.router.navigate(['/admin/supply', this.supplyWriteRequestAdminCall.data.id]).then();
          })
        )
        .subscribe();
    }
  }

  protected getTodayNoon(): Date {
    const date: Date = new Date();

    date.setHours(12, 0, 0, 0);

    return date;
  }
}
