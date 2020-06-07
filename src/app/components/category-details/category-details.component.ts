import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CategoryUrlPipe } from '../../pipes/category-url/category-url.pipe';
import { CategoryStore } from '../../models/category.model';
import { IconType } from '../icon/icon.models';
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

  public readonly IconType = IconType;
  public readonly ProductSortBy = ProductSortBy;
  public readonly SizeImage = SizeImage;

  public constructor(protected router: Router, protected categoryUrlPipe: CategoryUrlPipe) {}

  public ngOnInit(): void {}

  public onProductSortByChange(productSortBy: ProductSortBy): void {
    const url: string = this.categoryUrlPipe.transform(this.category, productSortBy);

    this.router.navigate([url]).then();
  }
}
