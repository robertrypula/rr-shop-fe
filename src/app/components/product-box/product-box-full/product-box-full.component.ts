import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ProductBoxAbstractComponent } from '../product-box-abstract.component';

@Component({
  selector: 'rr-shop-product-box-full',
  templateUrl: './product-box-full.component.html',
  styleUrls: ['./product-box-full.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductBoxFullComponent extends ProductBoxAbstractComponent implements OnInit {
  public ngOnInit(): void {
    // console.log('ProductBoxFullComponent nginit', this.product.name);
  }
}
