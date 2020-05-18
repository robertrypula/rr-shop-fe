import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryFacadeService } from '../../store/facades/category-facade.service';
import { CategoryStore, StructuralNode } from '../../models/category.model';
import { ClickableActionTheme, ClickableActionType } from '../clickable-action/clickable-action.model';
import { IconType } from '../icon/icon.models';

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

  @Input()
  public isWide = false;

  public readonly Align = Align;
  public readonly ClickableActionTheme = ClickableActionTheme;
  public readonly ClickableActionType = ClickableActionType;
  public readonly IconType = IconType;

  public categories$: Observable<CategoryStore[]> = this.categoryFacadeService.categoriesByStructuralNode$(
    StructuralNode.Header
  );

  public constructor(protected categoryFacadeService: CategoryFacadeService) {}

  public ngOnInit(): void {}

  public trackBy(index: number, item: CategoryStore): string {
    return item.id + '';
  }
}
