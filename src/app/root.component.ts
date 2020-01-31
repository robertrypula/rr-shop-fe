import { Component } from '@angular/core';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { tap } from 'rxjs/operators';

import { CategoryService } from './services/category.service';

@Component({
  selector: 'rr-shop-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent {
  protected routeNavigationStartCount = 0;

  public constructor(protected router: Router, protected categoryService: CategoryService) {
    this.handleRouteEvents();
  }

  protected handleRouteEvents(): void {
    this.router.events.pipe(tap(this.collapseCategoriesAfterRouteChange.bind(this))).subscribe();
  }

  protected collapseCategoriesAfterRouteChange(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.routeNavigationStartCount++;
      if (this.routeNavigationStartCount > 1) {
        this.categoryService.collapse();
      }
    }
  }
}
