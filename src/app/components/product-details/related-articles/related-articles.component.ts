import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryFacadeService } from '../../../store/facades/category-facade.service';
import { CategoryStore, StructuralNode } from '../../../models/category.model';
import { ClickableActionTheme } from '../../clickable-action/clickable-action.model';
import { IconType } from '../../icon/icon.models';

@Component({
  selector: 'rr-shop-related-articles',
  templateUrl: './related-articles.component.html',
  styleUrls: ['./related-articles.component.scss']
})
export class RelatedArticlesComponent implements OnInit {
  @Input()
  public categoryId: number;

  // TODO Product/Articles connection needs to be refactored
  // public category$: Observable<CategoryStore>;
  public categoryArticles$: Observable<CategoryStore>;

  public readonly ClickableActionTheme = ClickableActionTheme;
  public readonly IconType = IconType;
  public readonly StructuralNode = StructuralNode;

  public constructor(protected categoryFacadeService: CategoryFacadeService) {}

  public ngOnInit(): void {
    // this.category$ = this.categoryFacadeService.categoryWithParentByCategoryId$(this.categoryId);
    this.categoryArticles$ = this.categoryFacadeService.categoryByStructuralNode$(StructuralNode.Articles);
  }
}
