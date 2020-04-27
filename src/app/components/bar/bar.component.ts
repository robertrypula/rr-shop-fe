import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BarFacadeService } from '../../store/facades/bar-facade.service';
import { Bar, BarType } from '../../models/bar.model';
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
  public bars$: Observable<Bar[]> = this.barFacadeService.bars$;
  public isCookieModalVisible$: Observable<boolean> = this.barFacadeService.isCookieModalVisible$;
  public privacyPolicy$: Observable<CategoryStore> = this.categoryFacadeService.categoryByStructuralNode$(
    StructuralNode.PrivacyPolicy
  );

  public readonly BarType = BarType;
  public readonly ClickableActionTheme = ClickableActionTheme;
  public readonly IconType = IconType;

  public constructor(
    protected barFacadeService: BarFacadeService,
    protected categoryFacadeService: CategoryFacadeService
  ) {}

  public ngOnInit(): void {}

  public acceptCookies(): void {
    this.barFacadeService.acceptCookies();
  }

  public close(id: number): void {
    this.barFacadeService.close(id);
  }

  public trackBy(index: number, item: Bar): string {
    return item.id + '';
  }
}
