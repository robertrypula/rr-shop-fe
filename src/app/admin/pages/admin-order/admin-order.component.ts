import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { AdminBaseComponent } from '../admin-base-component.class';
import { Status } from '../../../models/order.model';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs/operators';
import { AdminCall } from '../../models/admin-component.models';

/**
 * It's not following any of the best practices but I wrote this Admin in 1 hour :)
 * TODO refactor it when complexity increase
 */

@Component({
  selector: 'rr-shop-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminOrderComponent extends AdminBaseComponent implements OnInit {
  public order: AdminCall = this.getAdminCall();
  public orderStatus: AdminCall = this.getAdminCall();

  public readonly Status = Status;

  public ngOnInit(): void {
    this.refresh();
  }

  public refresh(): void {
    this.get(this.order, `order/${this.route.snapshot.paramMap.get('id')}`).subscribe();
  }

  public setStatus(status: Status): void {
    this.patch(this.orderStatus, `order/${this.route.snapshot.paramMap.get('id')}`, { status })
      .pipe(
        tap(() => {
          this.refresh();
        })
      )
      .subscribe();
  }
}
