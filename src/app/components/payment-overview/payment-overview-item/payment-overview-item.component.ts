import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { ClickableActionTheme } from '../../clickable-action/clickable-action.model';
import { IconType } from '../../icon/icon.models';
import { OrderFacadeService } from '../../../store/facades/order-facade.service';
import { Product } from '../../../models/product.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[rr-shop-payment-overview-item]',
  templateUrl: './payment-overview-item.component.html',
  styleUrls: ['./payment-overview-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentOverviewItemComponent implements OnInit {
  @Input()
  public product: Product; // NOTE delivery is modeled as product

  public readonly ClickableActionTheme = ClickableActionTheme;
  public readonly IconType = IconType;

  public constructor(protected orderFacadeService: OrderFacadeService) {}

  public ngOnInit(): void {}

  public choosePayment(productId: number): void {
    this.orderFacadeService.choosePayment(productId);
  }
}
