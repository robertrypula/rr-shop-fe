import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../../models/product.model';
import { CategoryStore, StructuralNode } from '../../models/category.model';
import { ProductFacadeService } from '../../store/facades/product-facade.service';
import { MAIN_PAGE_PRODUCTS_IN_SECTION_LIMIT } from '../../config';
import { CategoryFacadeService } from '../../store/facades/category-facade.service';

@Component({
  selector: 'rr-shop-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  public categoryRecommended$: Observable<CategoryStore> = this.categoryFacadeService.categoryByStructuralNode$(
    StructuralNode.Recommended
  );
  public productsRecommended$: Observable<Product[]> = this.productFacadeService.productsFromCategoryByStructuralNode$(
    StructuralNode.Recommended,
    MAIN_PAGE_PRODUCTS_IN_SECTION_LIMIT
  );

  public categoryPromotions$: Observable<CategoryStore> = this.categoryFacadeService.categoryByStructuralNode$(
    StructuralNode.Promotions
  );
  public productsPromotions$: Observable<Product[]> = this.productFacadeService.productsFromCategoryByStructuralNode$(
    StructuralNode.Promotions,
    MAIN_PAGE_PRODUCTS_IN_SECTION_LIMIT
  );

  public constructor(
    protected categoryFacadeService: CategoryFacadeService,
    protected productFacadeService: ProductFacadeService
  ) {}

  public ngOnInit(): void {}
}
