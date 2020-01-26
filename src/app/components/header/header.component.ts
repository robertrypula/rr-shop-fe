import { Component, OnInit } from '@angular/core';

import { H1_TEXT } from '../../config/config';
import { ClickableActionTheme, ClickableActionType } from '../clickable-action/clickable-action.model';
import { Observable } from 'rxjs';
import { BasketService } from '../../services/basket.service';
import { ViewportService } from '../../services/viewport.service';

@Component({
  selector: 'rr-shop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public h1Text: string = H1_TEXT;

  public quantityTotal$: Observable<number>;
  public scrolledDownThatHeaderIsNotVisible$: Observable<boolean>;

  public readonly ClickableActionType = ClickableActionType;
  public readonly ClickableActionTheme = ClickableActionTheme;

  public constructor(protected basketService: BasketService, protected viewportService: ViewportService) {
    this.quantityTotal$ = this.basketService.quantityTotal$;
    this.scrolledDownThatHeaderIsNotVisible$ = this.viewportService.scrolledDownThatHeaderIsNotVisible$;
  }

  public ngOnInit(): void {}
}
