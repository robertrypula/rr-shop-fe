import { Component, OnInit } from '@angular/core';

import { AdminBaseComponent } from '../admin-base-component.class';
import { Status } from '../../../models/order.model';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs/operators';

/**
 * It's not following any of the best practices but I wrote this Admin in 1 hour :)
 * TODO refactor it when complexity increase
 */

@Component({
  selector: 'rr-shop-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent extends AdminBaseComponent implements OnInit {
  public readonly Status = Status;
  public errorPatch: any;

  public ngOnInit(): void {
    this.load(`order/${this.route.snapshot.paramMap.get('id')}`);
  }

  public setStatus(status: Status): void {
    this.isLoading = true;
    this.isError = false;
    this.http
      .patch<any>(`${environment.urlApi}admin/order/${this.route.snapshot.paramMap.get('id')}`, {
        status
      })
      .pipe(
        tap(
          (data: any): void => {
            this.isLoading = false;
            this.data = data;
            this.load(`order/${this.route.snapshot.paramMap.get('id')}`);
          },
          (error: any): void => {
            this.isLoading = false;
            this.isError = true;
            this.errorPatch = error;
          }
        )
      )
      .subscribe();
  }
}
