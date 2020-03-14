import { Pipe, PipeTransform } from '@angular/core';

import { CategoryStore } from '../../models/category.model';

@Pipe({
  name: 'categoryUrl'
})
export class CategoryUrlPipe implements PipeTransform {
  public transform(category: CategoryStore): string {
    return '/c/' + category.id + '/' + category.slug;
  }
}
