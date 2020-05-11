import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AdminBaseImageComponent } from '../admin-base-image-component.class';
import { AdminCall } from '../../../models/admin-component.models';

@Component({
  selector: 'rr-shop-admin-image-create',
  templateUrl: './admin-image-create.component.html',
  styleUrls: ['./admin-image-create.component.scss']
})
export class AdminImageCreateComponent extends AdminBaseImageComponent implements OnInit {
  public imageAdminCall: AdminCall = this.getAdminCall({
    categoryId: null,
    filename: '',
    id: null,
    manufacturerId: null,
    productId: null,
    sortOrder: 0
  });

  public ngOnInit(): void {
    this.refresh();
  }

  public refresh(): void {
    this.refreshRelations();
  }

  public create(): void {
    if (confirm('Czy na pewno?')) {
      this.post(this.imageWriteRequestAdminCall, `image`, this.getImageWriteRequestBody(this.imageAdminCall.data))
        .pipe(
          tap(() => {
            this.router.navigate(['/admin/image', this.imageWriteRequestAdminCall.data.id]).then();
          })
        )
        .subscribe();
    }
  }
}
