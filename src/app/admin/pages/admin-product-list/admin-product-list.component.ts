import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { AdminBaseComponent } from '../admin-base-component.class';
import { AdminCall } from '../../models/admin-component.models';

/**
 * It's not following any of the best practices but I wrote this Admin in 1 hour :)
 * TODO refactor it when complexity increase
 */

@Component({
  selector: 'rr-shop-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminProductListComponent extends AdminBaseComponent implements OnInit {
  public products: AdminCall = this.getAdminCall<any[]>();

  public ngOnInit(): void {
    this.refresh();
  }

  public refresh(): void {
    this.get(this.products, 'product').subscribe();
  }

  public getOrderItemsQuantityTotal(orderItems: any[]): number {
    return orderItems ? orderItems.reduce((a, c) => (a = a + c.quantity), 0) : 0;
  }
}
