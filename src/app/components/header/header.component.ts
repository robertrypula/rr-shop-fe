import { Component, OnInit } from '@angular/core';

import { H1_TEXT } from '../../config/config';
import { ClickableActionType } from '../button/clickable-action.model';

@Component({
  selector: 'rr-shop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public h1Text: string = H1_TEXT;

  public readonly ClickableActionType = ClickableActionType;

  public constructor() {}

  public ngOnInit(): void {}
}
