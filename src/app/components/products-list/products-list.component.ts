import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { CategoryStore } from '../../models/category.model';
import { ClickableActionType } from '../clickable-action/clickable-action.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'rr-shop-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsListComponent implements OnInit {
  @Input()
  public products: Product[];

  @Input()
  public category: CategoryStore = null;

  @Input()
  public isCategoryButtonVisible = false;

  @Input()
  public noProductsMessage: string;

  public readonly ClickableActionType = ClickableActionType;

  public constructor() {}

  public ngOnInit() {}

  public trackBy(index: number, item: Product): string {
    return item.id + '';
  }
}
