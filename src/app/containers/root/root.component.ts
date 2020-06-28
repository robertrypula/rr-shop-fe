import { ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthorizationFacadeService } from '../../store/facades/authorization-facade.service';
import { AuthorizationLocalStorage } from '../../models/authorization.model';
import { BarFacadeService } from '../../store/facades/bar-facade.service';
import { BarLocalStorage } from '../../models/bar.model';
import { LocalStorage, LocalStorageKey } from '../../models/local-storage.model';
import { OrderFacadeService } from '../../store/facades/order-facade.service';
import { OrderLocalStorage } from '../../models/order.model';
import { PageFacadeService } from '../../store/facades/page-facade.service';
import { ViewportFacadeService } from '../../store/facades/viewport-facade.service';

@Component({
  selector: 'rr-shop-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent {
  @ViewChild('content', { static: false })
  public content: ElementRef<HTMLElement>;

  public isLoadingOverlayVisible$: Observable<boolean> = this.pageFacadeService.isLoadingOverlayVisible$;

  public constructor(
    protected viewportFacadeService: ViewportFacadeService,
    protected authorizationFacadeService: AuthorizationFacadeService,
    protected barFacadeService: BarFacadeService,
    protected pageFacadeService: PageFacadeService,
    protected orderFacadeService: OrderFacadeService
  ) {
    this.handleScrollIntoContent();
  }

  @HostListener('window:storage', ['$event'])
  public handleSyncOrderLocalStorage(event: StorageEvent) {
    try {
      const newValue: LocalStorage = JSON.parse(event.newValue);

      switch (newValue.localStorageKey) {
        case LocalStorageKey.Authorization:
          this.authorizationFacadeService.setToken((newValue as AuthorizationLocalStorage).token);
          break;
        case LocalStorageKey.Bar:
          // (newValue as BarLocalStorage).isCookieModalVisible
          this.barFacadeService.acceptCookies(); // NOTE actually it should be setIsCookieModalVisible
          break;
        case LocalStorageKey.Order:
          this.orderFacadeService.syncOrderLocalStorage(newValue as OrderLocalStorage);
          break;
      }
    } catch (error) {
      // nothing here
    }
  }

  protected handleScrollIntoContent(): void {
    this.viewportFacadeService.selectGetFurtherNavigationIdAtEveryDevices$
      .pipe(
        tap((furtherNavigationIdOnlyAtSmallerDevices: number): void => {
          furtherNavigationIdOnlyAtSmallerDevices &&
            this.content &&
            this.content.nativeElement &&
            window.scrollTo &&
            window.scrollTo(0, 0);
          // this.content.nativeElement.scrollIntoView({}); TODO clean this
        })
      )
      .subscribe();
  }
}
