import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { filter, tap, withLatestFrom } from 'rxjs/operators';

import { CategoryService } from './services/category.service';
import { ViewportService } from './services/viewport.service';
import { Observable } from 'rxjs';
import { Device } from './models/viewport.model';
import { getCategoryId } from './utils/routing.util';

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
  protected routerNavigationStart$: Observable<RouterEvent>;

  public constructor(
    protected router: Router,
    protected categoryService: CategoryService,
    protected viewportService: ViewportService
  ) {
    this.handleRouteEvents();
    this.categoryService.loadCategories();
  }

  protected handleRouteEvents(): void {
    this.routerNavigationStart$ = this.router.events.pipe(
      filter((routerEvent: RouterEvent) => routerEvent instanceof NavigationStart)
    );

    this.routerNavigationStart$.pipe(tap(this.setActiveCategory.bind(this))).subscribe();
    this.routerNavigationStart$.pipe(tap(this.collapseCategoriesAfterRouteChange.bind(this))).subscribe();
    this.routerNavigationStart$
      .pipe(
        withLatestFrom(this.viewportService.device$),
        filter(([routerEvent, device]) => [Device.Mobile, Device.MobileVertical].includes(device)),
        tap(this.scrollToContentOnMobile.bind(this))
      )
      .subscribe();
  }

  protected setActiveCategory(navigationStart: NavigationStart): void {
    // console.log(navigationStart);
    this.categoryService.setActiveCategory(getCategoryId(navigationStart.url.replace('/', '')));
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
