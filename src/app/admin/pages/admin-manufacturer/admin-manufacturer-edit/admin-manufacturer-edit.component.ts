import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AdminBaseManufacturerComponent } from '../admin-base-manufacturer-component.class';
import { AdminCall } from '../../../models/admin-component.models';

@Component({
  selector: 'rr-shop-admin-manufacturer-edit',
  templateUrl: './admin-manufacturer-edit.component.html',
  styleUrls: ['./admin-manufacturer-edit.component.scss']
})
export class AdminManufacturerEditComponent extends AdminBaseManufacturerComponent implements OnInit {
  public manufacturerAdminCall: AdminCall = this.getAdminCall();

  public ngOnInit(): void {
    this.refresh();
  }

  public refresh(): void {
    this.get(this.manufacturerAdminCall, `manufacturer/${this.route.snapshot.paramMap.get('id')}`).subscribe();
    this.refreshRelations();
  }

  public save(): void {
    if (confirm('Czy na pewno?')) {
      this.patch(
        this.manufacturerWriteRequestAdminCall,
        `manufacturer/${this.route.snapshot.paramMap.get('id')}`,
        this.getManufacturerWriteRequestBody(this.manufacturerAdminCall.data)
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
