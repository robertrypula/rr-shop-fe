import { Component, Input, OnInit } from '@angular/core';

import { OrderService } from '../../../services/order.service';
import { ClickableActionTheme } from '../../clickable-action/clickable-action.model';
import { ProductEnriched } from '../../../models/product.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[rr-shop-payment-overview-item]',
  templateUrl: './payment-overview-item.component.html',
  styleUrls: ['./payment-overview-item.component.scss']
})
export class PaymentOverviewItemComponent implements OnInit {
  @Input()
  public productEnriched: ProductEnriched;

  public ClickableActionTheme = ClickableActionTheme;

  public constructor(protected orderService: OrderService) {}

  public ngOnInit(): void {}

  public choosePayment(productId: number): void {
    this.orderService.choosePayment(productId);
  }
}
