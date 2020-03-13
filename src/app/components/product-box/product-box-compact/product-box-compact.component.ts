import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ProductBoxAbstractComponent } from '../product-box-abstract.component';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'rr-shop-product-box-compact',
  templateUrl: './product-box-compact.component.html',
  styleUrls: ['./product-box-compact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductBoxCompactComponent extends ProductBoxAbstractComponent implements OnInit {
  public ngOnInit(): void {
    // console.log('ProductBoxCompactComponent nginit', this.product.name);
  }
}
