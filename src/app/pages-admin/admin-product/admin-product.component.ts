import { Component, OnInit } from '@angular/core';

import { AdminBaseComponent } from '../admin-base-component.class';

/**
 * It's not following any of the best practices but I wrote this Admin in 1 hour :)
 * TODO refactor it when complexity increase
 */

@Component({
  selector: 'rr-shop-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent extends AdminBaseComponent implements OnInit {
  public ngOnInit(): void {
    this.load(`product/${this.route.snapshot.paramMap.get('id')}`);
  }
}
