import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryFacadeService } from '../../store/facades/category-facade.service';
import { CategoryStore } from '../../models/category.model';
import { SizeImage } from '../../models/image.model';
import { ProductFacadeService } from '../../store/facades/product-facade.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'rr-shop-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit {
  public activeCategory$: Observable<CategoryStore> = this.categoryFacadeService.activeCategory$;
  public activeCategoryChildren$: Observable<CategoryStore[]> = this.categoryFacadeService.activeCategoryChildren$;
  public productsFromActiveCategoryAndItsChildren$: Observable<Product[]> = this.productFacadeService
    .productsFromActiveCategoryAndItsChildren$;

  public readonly SizeImage = SizeImage;

  public constructor(
    protected productFacadeService: ProductFacadeService,
    protected categoryFacadeService: CategoryFacadeService
  ) {}

  public ngOnInit(): void {}
}
