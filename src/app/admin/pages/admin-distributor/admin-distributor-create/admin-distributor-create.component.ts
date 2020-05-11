import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AdminBaseDistributorComponent } from '../admin-base-distributor-component.class';
import { AdminCall } from '../../../models/admin-component.models';

@Component({
  selector: 'rr-shop-admin-distributor-create',
  templateUrl: './admin-distributor-create.component.html',
  styleUrls: ['./admin-distributor-create.component.scss']
})
export class AdminDistributorCreateComponent extends AdminBaseDistributorComponent implements OnInit {
  public distributorAdminCall: AdminCall = this.getAdminCall({
    name: '',
    id: null
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
        this.distributorWriteRequestAdminCall,
        `distributor`,
        this.getDistributorWriteRequestBody(this.distributorAdminCall.data)
      )
        .pipe(
          tap(() => {
            this.router.navigate(['/admin/distributor', this.distributorWriteRequestAdminCall.data.id]).then();
          })
        )
        .subscribe();
    }
  }
}
