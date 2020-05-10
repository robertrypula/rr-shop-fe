import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AdminBaseImageComponent } from '../admin-base-image-component.class';
import { AdminCall } from '../../../models/admin-component.models';

@Component({
  selector: 'rr-shop-admin-image-edit',
  templateUrl: './admin-image-edit.component.html',
  styleUrls: ['./admin-image-edit.component.scss']
})
export class AdminImageEditComponent extends AdminBaseImageComponent implements OnInit {
  public imageAdminCall: AdminCall = this.getAdminCall();

  public ngOnInit(): void {
    this.refresh();
  }

  public refresh(): void {
    this.get(this.imageAdminCall, `image/${this.route.snapshot.paramMap.get('id')}`).subscribe();
    this.refreshRelations();
  }

  public save(): void {
    if (confirm('Czy na pewno?')) {
      this.patch(
        this.imageWriteRequestAdminCall,
        `image/${this.route.snapshot.paramMap.get('id')}`,
        this.getImageWriteRequestBody(this.imageAdminCall.data)
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
