import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryStore } from '../../../models/category.model';
import { ProductFacadeService } from '../../../store/facades/product-facade.service';
import { CategoryFacadeService } from '../../../store/facades/category-facade.service';

@Component({
  selector: 'rr-shop-category-node',
  templateUrl: './category-node.component.html',
  styleUrls: ['./category-node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryNodeComponent implements OnInit {
  @Input()
  public category: CategoryStore;

  @Input()
  public isRoot = false;

  public childCategories$: Observable<CategoryStore[]>;
  public productsCount$: Observable<number>;

  public constructor(
    protected categoryFacadeService: CategoryFacadeService,
    protected productFacadeService: ProductFacadeService
  ) {}

  public ngOnInit(): void {
    this.childCategories$ = this.categoryFacadeService.categoriesByParentId$(this.category.id);
    this.productsCount$ = this.productFacadeService.productsCountFromCategoryAndItsChildrenByCategoryId$(
      this.category.id
    );
  }

  public trackBy(index: number, item: CategoryStore): string {
    return item.id + '';
  }
}
