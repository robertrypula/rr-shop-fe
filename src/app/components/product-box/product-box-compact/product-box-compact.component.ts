import { Component, OnInit } from '@angular/core';

import { ProductBoxAbstractComponent } from '../product-box-abstract.component';
import { ClickableActionTheme, ClickableActionType } from '../../button/clickable-action.model';

@Component({
  selector: 'rr-shop-product-box-compact',
  templateUrl: './product-box-compact.component.html',
  styleUrls: ['./product-box-compact.component.scss']
})
export class ProductBoxCompactComponent extends ProductBoxAbstractComponent implements OnInit {
  public readonly ClickableActionType = ClickableActionType;
  public readonly clickableActionTheme = ClickableActionTheme;

  public ngOnInit(): void {
    // console.log('ProductBoxCompactComponent nginit', this.product.name);
  }
}
