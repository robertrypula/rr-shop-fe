import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../../models/product.model';
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
  public productsFromActiveCategoryAndItsChildren$: Observable<Product[]>;
  public activeCategory$: Observable<Category>;

  public constructor(protected productService: ProductService, protected categoryService: CategoryService) {
    this.productsFromActiveCategoryAndItsChildren$ = productService.productsFromActiveCategoryAndItsChildren$();
    this.activeCategory$ = categoryService.activeCategory$();
  }

  public ngOnInit(): void {}

  public trackBy(index: number, item: Product): string {
    return item.id + '';
  }
}
