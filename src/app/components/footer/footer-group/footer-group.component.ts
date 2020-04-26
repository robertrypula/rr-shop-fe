import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryFacadeService } from '../../../store/facades/category-facade.service';
import { CategoryStore } from '../../../models/category.model';

@Component({
  selector: 'rr-shop-footer-group',
  templateUrl: './footer-group.component.html',
  styleUrls: ['./footer-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterGroupComponent implements OnInit {
  @Input()
  public parentId: number;

  public categories$: Observable<CategoryStore[]>;

  public constructor(protected categoryFacadeService: CategoryFacadeService) {}

  public ngOnInit(): void {
    this.categories$ = this.categoryFacadeService.categoriesByParentId$(this.parentId);
  }

  public trackBy(index: number, item: CategoryStore): string {
    return item.id + '';
  }
}
