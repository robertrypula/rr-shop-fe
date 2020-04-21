import { Component, OnInit } from '@angular/core';

import { AdminBaseComponent } from '../admin-base-component.class';
import { Status } from '../../../models/order.model';

/**
 * It's not following any of the best practices but I wrote this Admin in 1 hour :)
 * TODO refactor it when complexity increase
 */

@Component({
  selector: 'rr-shop-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.scss']
})
export class AdminOrderListComponent extends AdminBaseComponent implements OnInit {
  public readonly Status = Status;
  public ngOnInit(): void {
    this.load('order');
  }
}
