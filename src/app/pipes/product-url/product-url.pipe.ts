import { Pipe, PipeTransform } from '@angular/core';

import { ProductEnriched } from '../../models/product.model';
import { CategoryStore } from '../../models/category.model';

@Pipe({
  name: 'productUrl'
})
export class ProductUrlPipe implements PipeTransform {
  public transform(productEnriched: ProductEnriched, categoryStore: CategoryStore = null): string {
    const categorySuffix: string = categoryStore ? ',' + categoryStore.id + '' : '';

    return productEnriched ? `/p/${productEnriched.id}/${productEnriched.slug}${categorySuffix}` : '';
  }
}
