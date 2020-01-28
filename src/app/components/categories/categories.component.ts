import { Component, OnInit } from '@angular/core';

import { ClickableActionTheme } from '../clickable-action/clickable-action.model';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'rr-shop-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public isCategoryBoxCollapsed$: Observable<boolean>;
  public readonly ClickableActionTheme = ClickableActionTheme;

  public constructor(protected categoryService: CategoryService) {
    this.isCategoryBoxCollapsed$ = categoryService.isCategoryBoxCollapsed$;

    this.isCategoryBoxCollapsed$.subscribe((v: boolean): void => {
      console.log(v);
    });
  }

  public ngOnInit(): void {}
}
