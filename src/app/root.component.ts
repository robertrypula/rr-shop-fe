import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, tap, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ViewportService } from './services/viewport.service';
import { SMALL_DEVICE_DEFINITION } from './config/config';

@Component({
  selector: 'rr-shop-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent {
  @ViewChild('content', { static: false })
  public content: ElementRef<HTMLElement>;

  protected routerNavigationEnd$: Observable<RouterEvent>;

  public constructor(protected router: Router, protected viewportService: ViewportService) {
    this.handleRouteEvents();
  }

  protected handleRouteEvents(): void {
    this.routerNavigationEnd$ = this.router.events.pipe(
      filter((routerEvent: RouterEvent) => routerEvent instanceof NavigationEnd)
    );

    // TODO move to effects
    this.routerNavigationEnd$
      .pipe(
        withLatestFrom(this.viewportService.device$),
        filter(([routerEvent, device]) => SMALL_DEVICE_DEFINITION.includes(device)),
        tap(this.scrollToContentOnMobile.bind(this))
      )
      .subscribe();
  }

  protected scrollToContentOnMobile(): void {
    this.content.nativeElement && this.content.nativeElement.scrollIntoView({});
  }
}
