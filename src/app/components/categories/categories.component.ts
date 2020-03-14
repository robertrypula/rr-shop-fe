import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ClickableActionTheme } from '../clickable-action/clickable-action.model';
import { CategoryStore, StructuralNode } from '../../models/category.model';
import { CategoryFacadeService } from '../../store/facades/category-facade.service';

@Component({
  selector: 'rr-shop-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit {
  public shopCategoryRoot$: Observable<CategoryStore> = this.categoryFacadeService.categoryByStructuralNode$(
    StructuralNode.ShopCategories
  );
  public isCollapseExpandButtonVisible$: Observable<boolean> = this.categoryFacadeService
    .isCollapseExpandButtonVisible$;
  public isListCollapsed$: Observable<boolean> = this.categoryFacadeService.isListCollapsed$;

  public readonly ClickableActionTheme = ClickableActionTheme;

  public constructor(protected categoryFacadeService: CategoryFacadeService) {}

  public ngOnInit(): void {}

  public onCollapseClick(): void {
    this.categoryFacadeService.setIsCollapsed(true);
  }

  public onExpandClick(): void {
    this.categoryFacadeService.setIsCollapsed(false);
  }
}
