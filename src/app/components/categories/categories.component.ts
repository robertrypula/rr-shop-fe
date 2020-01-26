import { Component, OnInit } from '@angular/core';

import { ClickableActionTheme } from '../clickable-action/clickable-action.model';

@Component({
  selector: 'rr-shop-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public readonly ClickableActionTheme = ClickableActionTheme;

  public constructor() {}

  public ngOnInit(): void {}
}
