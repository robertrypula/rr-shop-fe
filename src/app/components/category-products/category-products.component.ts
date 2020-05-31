import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryFacadeService } from '../../store/facades/category-facade.service';
import { CategoryStore } from '../../models/category.model';
import { ProductFacadeService } from '../../store/facades/product-facade.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'rr-shop-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryProductsComponent implements OnInit {
  @Input()
  public category: CategoryStore;

  @Input()
  public productsLimit: number;

  public category$: Observable<CategoryStore>;
  public productsLimitedInLength$: Observable<Product[]>;
  public productsLength$: Observable<number>;

  public constructor(
    protected categoryFacadeService: CategoryFacadeService,
    protected productFacadeService: ProductFacadeService
  ) {}

  public ngOnInit(): void {
    this.initializeCategoryToLink();
    this.initializeProducts();
  }

  protected getCategoryId(): number {
    return this.category.linkId ? this.category.linkId : this.category.id;
  }

  protected initializeCategoryToLink(): void {
    this.category$ = this.categoryFacadeService.categoryByCategoryId$(this.getCategoryId());
  }

  protected initializeProducts(): void {
    this.productsLimitedInLength$ = this.productFacadeService.productsFromCategoryById$(
      this.getCategoryId(),
      this.productsLimit
    );
    this.productsLength$ = this.productFacadeService.productsFromCategoryLengthByCategoryId$(this.getCategoryId());
  }
}
