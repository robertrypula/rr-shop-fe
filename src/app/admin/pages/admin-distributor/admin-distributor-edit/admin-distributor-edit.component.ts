import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AdminBaseDistributorComponent } from '../admin-base-distributor-component.class';
import { AdminCall } from '../../../models/admin-component.models';

@Component({
  selector: 'rr-shop-admin-distributor-edit',
  templateUrl: './admin-distributor-edit.component.html',
  styleUrls: ['./admin-distributor-edit.component.scss']
})
export class AdminDistributorEditComponent extends AdminBaseDistributorComponent implements OnInit {
  public distributorAdminCall: AdminCall = this.getAdminCall();

  public ngOnInit(): void {
    this.refresh();
  }

  public refresh(): void {
    this.get(this.distributorAdminCall, `distributor/${this.route.snapshot.paramMap.get('id')}`).subscribe();
    this.refreshRelations();
  }

  public save(): void {
    if (confirm('Czy na pewno?')) {
      this.patch(
        this.distributorWriteRequestAdminCall,
        `distributor/${this.route.snapshot.paramMap.get('id')}`,
        this.getDistributorWriteRequestBody(this.distributorAdminCall.data)
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
