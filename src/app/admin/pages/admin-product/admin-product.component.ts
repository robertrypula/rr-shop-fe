import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { AdminBaseComponent } from '../admin-base-component.class';
import { AdminCall } from '../../models/admin-component.models';

/**
 * It's not following any of the best practices but I wrote this Admin in 1 hour :)
 * TODO refactor it when complexity increase
 */

@Component({
  selector: 'rr-shop-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminProductComponent extends AdminBaseComponent implements OnInit {
  public product: AdminCall = this.getAdminCall();

  public ngOnInit(): void {
    this.refresh();
  }

  public refresh(): void {
    this.get(this.product, `product/${this.route.snapshot.paramMap.get('id')}`).subscribe();
  }
}
