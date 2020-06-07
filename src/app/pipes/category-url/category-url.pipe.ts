import { Pipe, PipeTransform } from '@angular/core';

import { CategoryStore } from '../../models/category.model';
import {
  ProductSortBy,
  URL_SORT_BY_NAME_ASCENDING,
  URL_SORT_BY_NAME_DESCENDING,
  URL_SORT_BY_NONE,
  URL_SORT_BY_PRICE_ASCENDING,
  URL_SORT_BY_PRICE_DESCENDING
} from '../../models/product.model';

@Pipe({
  name: 'categoryUrl'
})
export class CategoryUrlPipe implements PipeTransform {
  public transform(categoryStore: CategoryStore, productSortBy: ProductSortBy = ProductSortBy.None): string {
    const categoryId: string = categoryStore ? `${categoryStore.id}` : '';
    const slug: string = categoryStore ? categoryStore.slug : '';
    const urlSortBy: string = this.getUrlSortBy(productSortBy);

    return `/c/${categoryId}/${slug}/${urlSortBy}`;
  }

  protected getUrlSortBy(productSortBy: ProductSortBy): string {
    switch (productSortBy) {
      case ProductSortBy.None:
        return URL_SORT_BY_NONE;
      case ProductSortBy.NameAscending:
        return URL_SORT_BY_NAME_ASCENDING;
      case ProductSortBy.NameDescending:
        return URL_SORT_BY_NAME_DESCENDING;
      case ProductSortBy.PriceAscending:
        return URL_SORT_BY_PRICE_ASCENDING;
      case ProductSortBy.PriceDescending:
        return URL_SORT_BY_PRICE_DESCENDING;
    }
  }
}
