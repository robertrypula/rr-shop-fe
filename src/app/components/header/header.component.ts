import { Component, OnInit } from '@angular/core';

import { H1_TEXT } from '../../config/config';
import { ClickableActionTheme, ClickableActionType } from '../clickable-action/clickable-action.model';
import { Observable } from 'rxjs';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'rr-shop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public h1Text: string = H1_TEXT;

  public quantityTotal$: Observable<number>;

  public readonly ClickableActionType = ClickableActionType;
  public readonly ClickableActionTheme = ClickableActionTheme;

  public constructor(protected basketService: BasketService) {
    this.quantityTotal$ = this.basketService.quantityTotal$;
  }

  public ngOnInit(): void {}
}
