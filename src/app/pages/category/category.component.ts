import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../../models/product.model';
import { CategoryStore } from '../../models/category.model';
import { ProductFacadeService } from '../../store/facades/product-facade.service';
import { CategoryFacadeService } from '../../store/facades/category-facade.service';

@Component({
  selector: 'rr-shop-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit {
  public activeCategory$: Observable<CategoryStore> = this.categoryFacadeService.activeCategory$;
  public productsFromActiveCategoryAndItsChildren$: Observable<Product[]> = this.productFacadeService
    .productsFromActiveCategoryAndItsChildren$;

  public constructor(
    protected productFacadeService: ProductFacadeService,
    protected categoryFacadeService: CategoryFacadeService
  ) {}

  public ngOnInit(): void {}

  public trackBy(index: number, item: Product): string {
    return item.id + '';
  }
}
