import { Component, Input, OnInit } from '@angular/core';

import { CategoryStore } from '../../models/category.model';
import { ClickableActionTheme } from '../clickable-action/clickable-action.model';
import { IconType } from '../icon/icon.models';
import { OrderFacadeService } from '../../store/facades/order-facade.service';
import { Order } from '../../models/order.model';
import { Type } from '../../models/product.model';

@Component({
  selector: 'rr-shop-potential-order',
  templateUrl: './potential-order.component.html',
  styleUrls: ['./potential-order.component.scss']
})
export class PotentialOrderComponent implements OnInit {
  @Input()
  public order: Order;

  @Input()
  public categoryRegulations: CategoryStore;

  @Input()
  public categoryPrivacyPolicy: CategoryStore;

  public readonly ClickableActionTheme = ClickableActionTheme;
  public readonly IconType = IconType;
  public readonly Type = Type;

  public constructor(protected orderFacadeService: OrderFacadeService) {}

  public ngOnInit(): void {}

  public createOrder(): void {
    this.orderFacadeService.createOrder();
  }

  public toggleLegalConfirmation(): void {
    this.orderFacadeService.toggleLegalConfirmation();
  }
}
