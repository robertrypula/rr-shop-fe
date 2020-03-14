import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryStore } from '../../models/category.model';
import { CategoryFacadeService } from '../../store/facades/category-facade.service';

@Component({
  selector: 'rr-shop-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsComponent implements OnInit {
  public categoriesWithActiveLevelSorted$: Observable<CategoryStore[]> = this.categoryFacadeService
    .categoriesWithActiveLevelSorted$;

  public constructor(protected categoryFacadeService: CategoryFacadeService) {}

  public ngOnInit(): void {}

  public trackBy(index: number, item: CategoryStore): string {
    return item.id + '';
  }
}
