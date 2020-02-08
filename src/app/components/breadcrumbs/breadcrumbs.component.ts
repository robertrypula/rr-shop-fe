import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'rr-shop-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  public categories$: Observable<Category[]>;

  public constructor(protected categoryService: CategoryService) {
    this.categories$ = categoryService.categoriesWithActiveLevelSorted$;
  }

  public ngOnInit(): void {}
}
