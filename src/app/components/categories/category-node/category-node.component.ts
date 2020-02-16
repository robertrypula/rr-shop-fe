import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'rr-shop-category-node',
  templateUrl: './category-node.component.html',
  styleUrls: ['./category-node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryNodeComponent implements OnInit {
  @Input()
  public category: Category;

  @Input()
  public isRoot = false;

  public childCategories$: Observable<Category[]>;
  public something$: Observable<number>;

  public constructor(protected categoryService: CategoryService, protected productService: ProductService) {}

  public ngOnInit(): void {
    this.childCategories$ = this.categoryService.categoriesByParentId$(this.category.id);
    this.something$ = this.productService.productsCountFromCategoryAndItsChildrenByCategoryId$(this.category.id);
  }

  public trackBy(index: number, item: Category): string {
    return item.id + '';
  }
}
