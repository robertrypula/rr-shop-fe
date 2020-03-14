import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryStore, StructuralNode } from '../../models/category.model';
import { CategoryFacadeService } from '../../store/facades/category-facade.service';

@Component({
  selector: 'rr-shop-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopMenuComponent implements OnInit {
  public categories$: Observable<CategoryStore[]> = this.categoryFacadeService.categoriesByStructuralNode$(
    StructuralNode.Header
  );

  public constructor(protected categoryFacadeService: CategoryFacadeService) {}

  public ngOnInit(): void {}

  public trackBy(index: number, item: CategoryStore): string {
    return item.id + '';
  }
}
