import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ViewportService } from '../../services/viewport.service';
import { ClickableActionTheme, ClickableActionType } from '../clickable-action/clickable-action.model';
import { OrderFacadeService } from '../../store/facades/order-facade.service';

@Component({
  selector: 'rr-shop-header-sticky',
  templateUrl: './header-sticky.component.html',
  styleUrls: ['./header-sticky.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderStickyComponent implements OnInit {
  public quantityTotal$: Observable<number> = this.orderFacadeService.quantityTotal$;
  public scrolledDownThatHeaderIsNotVisible$: Observable<boolean> = this.viewportService
    .isScrolledDownThatHeaderIsNotVisible$;

  public readonly ClickableActionType = ClickableActionType;
  public readonly ClickableActionTheme = ClickableActionTheme;

  public constructor(protected orderFacadeService: OrderFacadeService, protected viewportService: ViewportService) {}

  public ngOnInit(): void {}
}
