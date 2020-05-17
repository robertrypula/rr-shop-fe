import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryFacadeService } from '../../store/facades/category-facade.service';
import { CategoryStore, StructuralNode } from '../../models/category.model';
import { MAIN_PAGE_PRODUCTS_IN_SECTION_LIMIT } from '../../config';
import { IconType } from '../../components/icon/icon.models';
import { ProductFacadeService } from '../../store/facades/product-facade.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'rr-shop-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  public categoriesMainPageSlider$: Observable<
    CategoryStore[]
  > = this.categoryFacadeService.categoriesByStructuralNode$(StructuralNode.MainPageSlider);

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

  public readonly IconType = IconType;

  public constructor(
    protected categoryFacadeService: CategoryFacadeService,
    protected productFacadeService: ProductFacadeService
  ) {}

  public ngOnInit(): void {}
}
