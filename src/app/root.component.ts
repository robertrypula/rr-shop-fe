import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, tap, withLatestFrom } from 'rxjs/operators';

import { CategoryService } from './services/category.service';
import { ViewportService } from './services/viewport.service';
import { Observable } from 'rxjs';
import { Device } from './models/viewport.model';

@Component({
  selector: 'rr-shop-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent {
  @ViewChild('content', { static: false })
  public content: ElementRef<HTMLElement>;

  protected routeNavigationStartCount = 0;
  protected routerNavigationEnd$: Observable<RouterEvent>;

  public constructor(
    protected router: Router,
    protected categoryService: CategoryService,
    protected viewportService: ViewportService
  ) {
    this.handleRouteEvents();
    this.categoryService.loadCategories();
  }

  protected handleRouteEvents(): void {
    this.routerNavigationEnd$ = this.router.events.pipe(
      filter((routerEvent: RouterEvent) => routerEvent instanceof NavigationEnd)
    );

    this.routerNavigationEnd$.pipe(tap(this.setActiveCategory.bind(this))).subscribe();
    this.routerNavigationEnd$.pipe(tap(this.collapseCategoriesAfterRouteChange.bind(this))).subscribe();
    this.routerNavigationEnd$
      .pipe(
        withLatestFrom(this.viewportService.device$),
        filter(([routerEvent, device]) => [Device.Mobile, Device.MobileVertical].includes(device)),
        tap(this.scrollToContentOnMobile.bind(this))
      )
      .subscribe();
  }

  protected setActiveCategory(): void {
    this.categoryService.setActiveLevel(this.categoryService.getActiveLevelUpdateEntriesBasedOnRoute());
  }

  protected collapseCategoriesAfterRouteChange(): void {
    this.routeNavigationStartCount++;
    if (this.routeNavigationStartCount > 1) {
      this.categoryService.collapse();
    }
  }

  protected scrollToContentOnMobile(): void {
    this.content.nativeElement && this.content.nativeElement.scrollIntoView({});
  }
}
