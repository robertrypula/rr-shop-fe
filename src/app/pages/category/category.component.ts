import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product, ProductEnriched } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'rr-shop-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit {
  public activeCategory$: Observable<Category>;
  public productsEnrichedFromActiveCategoryAndItsChildren$: Observable<ProductEnriched[]>;

  public constructor(protected productService: ProductService, protected categoryService: CategoryService) {
    this.activeCategory$ = categoryService.activeCategory$;
    this.productsEnrichedFromActiveCategoryAndItsChildren$ = productService.productsEnrichedFromActiveCategoryAndItsChildren$;
  }

  public ngOnInit(): void {}

  public trackBy(index: number, item: Product): string {
    return item.id + '';
  }
}
