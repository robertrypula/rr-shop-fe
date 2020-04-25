import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ViewportService } from '../../services/viewport.service';
import { OrderFacadeService } from '../../store/facades/order-facade.service';

@Component({
  selector: 'rr-shop-header-sticky',
  templateUrl: './header-sticky.component.html',
  styleUrls: ['./header-sticky.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderStickyComponent implements OnInit {
  public scrolledDownThatHeaderIsNotVisible$: Observable<boolean> = this.viewportService
    .isScrolledDownThatHeaderIsNotVisible$;

  public constructor(protected orderFacadeService: OrderFacadeService, protected viewportService: ViewportService) {}

  public ngOnInit(): void {}
}
