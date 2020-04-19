import { Pipe, PipeTransform } from '@angular/core';

import { CategoryStore } from '../../models/category.model';

@Pipe({
  name: 'categoryUrl'
})
export class CategoryUrlPipe implements PipeTransform {
  public transform(categoryStore: CategoryStore): string {
    return `/c/${categoryStore ? categoryStore.id : ''}/${categoryStore ? categoryStore.slug : ''}`;
  }
}
