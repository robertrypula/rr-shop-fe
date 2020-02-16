import { Pipe, PipeTransform } from '@angular/core';

import { Category } from '../../models/category.model';

@Pipe({
  name: 'categoryUrl'
})
export class CategoryUrlPipe implements PipeTransform {
  public transform(category: Category): string {
    return '/c/' + category.id + '/' + category.slug;
  }
}
