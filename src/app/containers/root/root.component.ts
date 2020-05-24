import { ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { OrderFacadeService } from '../../store/facades/order-facade.service';
import { OrderLocalStorage } from '../../models/order.model';
import { PageFacadeService } from '../../store/facades/page-facade.service';
import { ViewportService } from '../../services/viewport.service';

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
    protected viewportService: ViewportService,
    protected pageFacadeService: PageFacadeService,
    protected orderFacadeService: OrderFacadeService
  ) {
    this.handleScrollIntoContent();
  }

  @HostListener('window:storage', ['$event'])
  public handleSyncOrderLocalStorage(event: StorageEvent) {
    console.log(event.newValue);
    this.orderFacadeService.syncOrderLocalStorage(JSON.parse(event.newValue) as OrderLocalStorage);
  }

  protected handleScrollIntoContent(): void {
    this.viewportService.getFurtherNavigationIdOnlyAtSmallerDevices$
      .pipe(
        tap((furtherNavigationIdOnlyAtSmallerDevices: number): void => {
          furtherNavigationIdOnlyAtSmallerDevices &&
            this.content &&
            this.content.nativeElement &&
            this.content.nativeElement.scrollIntoView({});
        })
      )
      .subscribe();
  }
}
