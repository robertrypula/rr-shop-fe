import { ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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
    protected pageFacadeService: PageFacadeService,
    protected orderFacadeService: OrderFacadeService
  ) {
    this.handleScrollIntoContent();
  }

  @HostListener('window:storage', ['$event'])
  public handleSyncOrderLocalStorage(event: StorageEvent) {
    this.orderFacadeService.syncOrderLocalStorage(JSON.parse(event.newValue) as OrderLocalStorage);
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
