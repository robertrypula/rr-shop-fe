import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ClickableActionTheme, ClickableActionType } from '../clickable-action/clickable-action.model';
import { IconType } from '../icon/icon.models';
import { OrderFacadeService } from '../../store/facades/order-facade.service';
import { Order } from '../../models/order.model';
import { POTENTIAL_ORDER_UUID } from '../../store/reducers/order.reducers';
import { Type } from '../../models/product.model';

@Component({
  selector: 'rr-shop-top-basket',
  templateUrl: './top-basket.component.html',
  styleUrls: ['./top-basket.component.scss']
})
export class TopBasketComponent implements OnInit {
  @Input()
  public showLabel: boolean;

  public potentialOrder$: Observable<Order> = this.orderFacadeService.orderByUuid$(`${POTENTIAL_ORDER_UUID}`);

  public readonly ClickableActionTheme = ClickableActionTheme;
  public readonly ClickableActionType = ClickableActionType;
  public readonly IconType = IconType;
  public readonly Type = Type;

  public constructor(protected orderFacadeService: OrderFacadeService) {}

  public ngOnInit(): void {}
}
