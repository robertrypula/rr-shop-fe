import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AdminBaseComponent } from '../admin-base-component.class';
import { AdminCall } from '../../models/admin-component.models';
import { environment } from '../../../../environments/environment';
import { Status } from '../../../models/order.model';
import { Type } from '../../../models/product.model';

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
  public readonly Type = Type;

  public ngOnInit(): void {
    this.refresh();
  }

  public getPriceTotalOriginal(orderItems: any[]): number {
    return orderItems.reduce(
      (accumulator: number, orderItem: any): number => accumulator + orderItem.priceUnitOriginal * orderItem.quantity,
      0
    );
  }

  public getPriceTotalSelling(orderItems: any[]): number {
    return orderItems.reduce(
      (accumulator: number, orderItem: any): number => accumulator + orderItem.priceUnitSelling * orderItem.quantity,
      0
    );
  }

  public getPriceTotalOriginalSellingDifference(orderItems: any[]): number {
    return this.getPriceTotalOriginal(orderItems) - this.getPriceTotalSelling(orderItems);
  }

  public refresh(): void {
    this.get(this.order, `order/${this.route.snapshot.paramMap.get('id')}`).subscribe();
  }

  public setStatus(status: Status): void {
    if (confirm('Czy na pewno?')) {
      this.patch(this.orderStatus, `order/${this.route.snapshot.paramMap.get('id')}`, { status })
        .pipe(
          tap(() => {
            this.refresh();
          })
        )
        .subscribe();
    }
  }

  public supplyOrderItemAttach(supplyId: number, orderItemId: number): void {
    this.patch(this.orderStatus, `supply/${supplyId}/orderItemId`, { orderItemId })
      .pipe(
        tap(() => {
          this.refresh();
        })
      )
      .subscribe();
  }

  public supplyOrderItemDetach(supplyId: number): void {
    this.patch(this.orderStatus, `supply/${supplyId}/orderItemId`, { orderItemId: null })
      .pipe(
        tap(() => {
          this.refresh();
        })
      )
      .subscribe();
  }
}
