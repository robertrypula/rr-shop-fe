import { Pipe, PipeTransform } from '@angular/core';

import { CategoryStore } from '../../models/category.model';
import { Product } from '../../models/product.model';

@Pipe({
  name: 'productUrl'
})
export class ProductUrlPipe implements PipeTransform {
  public transform(product: Product, categoryStore: CategoryStore = null): string {
    const categorySuffix: string = categoryStore ? ',' + categoryStore.id + '' : '';

    return product ? `/p/${product.id}/${product.slug}${categorySuffix}` : '';
  }
}
