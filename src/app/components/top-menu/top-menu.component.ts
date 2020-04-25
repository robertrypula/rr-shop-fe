import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryStore, StructuralNode } from '../../models/category.model';
import { CategoryFacadeService } from '../../store/facades/category-facade.service';
import { Align } from './top-menu.models';

@Component({
  selector: 'rr-shop-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopMenuComponent implements OnInit {
  @Input()
  public align: Align;

  public readonly Align = Align;

  public categories$: Observable<CategoryStore[]> = this.categoryFacadeService.categoriesByStructuralNode$(
    StructuralNode.Header
  );

  public constructor(protected categoryFacadeService: CategoryFacadeService) {}

  public ngOnInit(): void {}

  public trackBy(index: number, item: CategoryStore): string {
    return item.id + '';
  }
}
