import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { ViewportService } from '../../services/viewport.service';
import { ClickableActionTheme, ClickableActionType } from '../clickable-action/clickable-action.model';

@Component({
  selector: 'rr-shop-header-sticky',
  templateUrl: './header-sticky.component.html',
  styleUrls: ['./header-sticky.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderStickyComponent implements OnInit {
  public quantityTotal$: Observable<number>;
  public scrolledDownThatHeaderIsNotVisible$: Observable<boolean>;

  public readonly ClickableActionType = ClickableActionType;
  public readonly ClickableActionTheme = ClickableActionTheme;

  public constructor(protected orderService: OrderService, protected viewportService: ViewportService) {
    this.quantityTotal$ = this.orderService.quantityTotal$;
    this.scrolledDownThatHeaderIsNotVisible$ = this.viewportService.isScrolledDownThatHeaderIsNotVisible$;
  }

  public ngOnInit(): void {}
}
