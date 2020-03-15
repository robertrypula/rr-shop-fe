import { Component, OnInit } from '@angular/core';

import { AdminBaseComponent } from '../admin-base-component.class';

/**
 * It's not following any of the best practices but I wrote this Admin in 1 hour :)
 * TODO refactor it when complexity increase
 */

@Component({
  selector: 'rr-shop-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.scss']
})
export class AdminProductListComponent extends AdminBaseComponent implements OnInit {
  public ngOnInit(): void {
    this.load('product');
  }
}
