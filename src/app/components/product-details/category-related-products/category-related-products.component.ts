import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryFacadeService } from '../../../store/facades/category-facade.service';
import { CategoryStore } from '../../../models/category.model';
import { CATEGORY_RELATED_PRODUCTS_LIMIT } from '../../../config';

@Component({
  selector: 'rr-shop-category-related-products',
  templateUrl: './category-related-products.component.html',
  styleUrls: ['./category-related-products.component.scss']
})
export class CategoryRelatedProductsComponent implements OnInit {
  @Input()
  public categoryId: number;

  public category$: Observable<CategoryStore>;

  public readonly CATEGORY_RELATED_PRODUCTS_LIMIT: number = CATEGORY_RELATED_PRODUCTS_LIMIT;

  public constructor(protected categoryFacadeService: CategoryFacadeService) {}

  public ngOnInit(): void {
    this.category$ = this.categoryFacadeService.categoryWithParentByCategoryId$(this.categoryId);
  }
}
