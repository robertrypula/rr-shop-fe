import { Pipe, PipeTransform } from '@angular/core';

import { Product } from '../../models/product.model';
import { CategoryStore } from '../../models/category.model';

@Pipe({
  name: 'productUrl'
})
export class ProductUrlPipe implements PipeTransform {
  public transform(product: Product, activeCategory: CategoryStore = null): string {
    const activeCategorySuffix: string = activeCategory ? ',' + activeCategory.id + '' : '';

    return product ? `/p/${product.id}/${product.slug}${activeCategorySuffix}` : '';
  }
}
