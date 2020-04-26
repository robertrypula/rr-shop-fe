import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Align } from '../top-menu/top-menu.models';
import { ViewportService } from '../../services/viewport.service';

@Component({
  selector: 'rr-shop-header-sticky',
  templateUrl: './header-sticky.component.html',
  styleUrls: ['./header-sticky.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderStickyComponent implements OnInit {
  public scrolledDownThatHeaderIsNotVisible$: Observable<boolean> = this.viewportService
    .isScrolledDownThatHeaderIsNotVisible$;

  public readonly Align = Align;

  public constructor(protected viewportService: ViewportService) {}

  public ngOnInit(): void {}
}
