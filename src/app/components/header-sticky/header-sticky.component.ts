import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ViewportService } from '../../services/viewport.service';
import { ClickableActionTheme, ClickableActionType } from '../clickable-action/clickable-action.model';
import { OrderFacadeService } from '../../store/facades/order-facade.service';
import { POTENTIAL_ORDER_UUID } from '../../store/reducers/order.reducers';
import { Order } from '../../models/order.model';
import { Type } from '../../models/product.model';
import { IconType } from '../icon/icon.models';

@Component({
  selector: 'rr-shop-header-sticky',
  templateUrl: './header-sticky.component.html',
  styleUrls: ['./header-sticky.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderStickyComponent implements OnInit {
  public potentialOrder$: Observable<Order> = this.orderFacadeService.orderByUuid$(`${POTENTIAL_ORDER_UUID}`);
  public scrolledDownThatHeaderIsNotVisible$: Observable<boolean> = this.viewportService
    .isScrolledDownThatHeaderIsNotVisible$;

  public readonly ClickableActionTheme = ClickableActionTheme;
  public readonly ClickableActionType = ClickableActionType;
  public readonly IconType = IconType;
  public readonly Type = Type;

  public constructor(protected orderFacadeService: OrderFacadeService, protected viewportService: ViewportService) {}

  public ngOnInit(): void {}
}
