import { Component, Input, OnInit } from '@angular/core';

import { CategoryStore } from '../../models/category.model';
import { SizeImage } from '../../models/image.model';
import { Product, ProductSortBy } from '../../models/product.model';

@Component({
  selector: 'rr-shop-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  @Input()
  public productSortBy: ProductSortBy;

  @Input()
  public products: Product[];

  @Input()
  public category: CategoryStore;

  @Input()
  public categoryChildren: CategoryStore[];

  public readonly SizeImage = SizeImage;

  public ngOnInit(): void {}
}
