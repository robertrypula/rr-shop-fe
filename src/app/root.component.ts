import { Component, ElementRef, ViewChild } from '@angular/core';
import { tap } from 'rxjs/operators';

import { ViewportService } from './services/viewport.service';
import { Observable } from 'rxjs';
import { PageFacadeService } from './store/facades/page-facade.service';

@Component({
  selector: 'rr-shop-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush // TODO admin is not working when OnPush is enabled
})
export class RootComponent {
  @ViewChild('content', { static: false })
  public content: ElementRef<HTMLElement>;

  public isLoadingOverlayVisible$: Observable<boolean> = this.pageFacadeService.isLoadingOverlayVisible$;

  public constructor(protected viewportService: ViewportService, protected pageFacadeService: PageFacadeService) {
    this.handleScrollIntoContent();
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
