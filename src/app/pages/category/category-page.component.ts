import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryFacadeService } from '../../store/facades/category-facade.service';
import { CategoryStore } from '../../models/category.model';
import { ProductFacadeService } from '../../store/facades/product-facade.service';
import { Product, ProductSortBy } from '../../models/product.model';

@Component({
  selector: 'rr-shop-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryPageComponent implements OnInit {
  public activeCategoryProductSortBy$: Observable<ProductSortBy> = this.categoryFacadeService
    .activeCategoryProductSortBy$;
  public activeCategory$: Observable<CategoryStore> = this.categoryFacadeService.activeCategory$;
  public activeCategoryChildren$: Observable<CategoryStore[]> = this.categoryFacadeService.activeCategoryChildren$;
  public productsFromActiveCategoryAndItsChildren$: Observable<Product[]> = this.productFacadeService
    .productsFromActiveCategoryAndItsChildren$;

  public constructor(
    protected productFacadeService: ProductFacadeService,
    protected categoryFacadeService: CategoryFacadeService
  ) {}

  public ngOnInit(): void {}
}
