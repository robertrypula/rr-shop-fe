import { Component, OnInit } from '@angular/core';

import { AdminBaseComponent } from '../admin-base-component.class';

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
  public ngOnInit(): void {
    this.load(`order/${this.route.snapshot.paramMap.get('id')}`);
  }
}
