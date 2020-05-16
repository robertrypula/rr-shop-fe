import { Component, Input, OnInit } from '@angular/core';

import { CategoryStore } from '../../models/category.model';
import { ClickableActionType } from '../clickable-action/clickable-action.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'rr-shop-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  @Input()
  public categories: CategoryStore[];

  public readonly ClickableActionType = ClickableActionType;

  public constructor() {}

  public ngOnInit(): void {}

  public trackBy(index: number, item: CategoryStore): string {
    return item.id + '';
  }
}
