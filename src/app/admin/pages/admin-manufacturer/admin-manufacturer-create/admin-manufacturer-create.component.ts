import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AdminBaseManufacturerComponent } from '../admin-base-manufacturer-component.class';
import { AdminCall } from '../../../models/admin-component.models';

@Component({
  selector: 'rr-shop-admin-manufacturer-create',
  templateUrl: './admin-manufacturer-create.component.html',
  styleUrls: ['./admin-manufacturer-create.component.scss']
})
export class AdminManufacturerCreateComponent extends AdminBaseManufacturerComponent implements OnInit {
  public manufacturerAdminCall: AdminCall = this.getAdminCall({
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
        this.manufacturerWriteRequestAdminCall,
        `manufacturer`,
        this.getManufacturerWriteRequestBody(this.manufacturerAdminCall.data)
      )
        .pipe(
          tap(() => {
            this.router.navigate(['/admin/manufacturer', this.manufacturerWriteRequestAdminCall.data.id]).then();
          })
        )
        .subscribe();
    }
  }
}
