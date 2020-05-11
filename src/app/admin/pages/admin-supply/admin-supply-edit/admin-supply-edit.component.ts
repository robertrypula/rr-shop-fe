import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AdminBaseSupplyComponent } from '../admin-base-supply-component.class';
import { AdminCall } from '../../../models/admin-component.models';

@Component({
  selector: 'rr-shop-admin-supply-edit',
  templateUrl: './admin-supply-edit.component.html',
  styleUrls: ['./admin-supply-edit.component.scss']
})
export class AdminSupplyEditComponent extends AdminBaseSupplyComponent implements OnInit {
  public supplyAdminCall: AdminCall = this.getAdminCall();

  public ngOnInit(): void {
    this.refresh();
  }

  public refresh(): void {
    this.get(this.supplyAdminCall, `supply/${this.route.snapshot.paramMap.get('id')}`).subscribe();
    this.refreshRelations();
  }

  public save(): void {
    if (confirm('Czy na pewno?')) {
      this.patch(
        this.supplyWriteRequestAdminCall,
        `supply/${this.route.snapshot.paramMap.get('id')}`,
        this.getSupplyWriteRequestBody(this.supplyAdminCall.data)
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
