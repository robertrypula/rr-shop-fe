import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Bar, BarType } from '../../models/bar.model';
import { BarService } from '../../services/bar.service';
import { CategoryFacadeService } from '../../store/facades/category-facade.service';
import { CategoryStore, StructuralNode } from '../../models/category.model';
import { ClickableActionTheme } from '../clickable-action/clickable-action.model';
import { IconType } from '../icon/icon.models';

@Component({
  selector: 'rr-shop-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarComponent implements OnInit {
  public bars$: Observable<Bar[]> = this.barService.bars$;
  public privacyPolicy$: Observable<CategoryStore> = this.categoryFacadeService.categoryByStructuralNode$(
    StructuralNode.PrivacyPolicy
  );

  public readonly BarType = BarType;
  public readonly ClickableActionTheme = ClickableActionTheme;
  public readonly IconType = IconType;

  public constructor(protected barService: BarService, protected categoryFacadeService: CategoryFacadeService) {}

  public ngOnInit(): void {}

  public close(id: number): void {
    this.barService.close(id);
  }

  public trackBy(index: number, item: Bar): string {
    return item.id + '';
  }
}
