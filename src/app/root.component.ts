import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { tap } from 'rxjs/operators';

import { ViewportService } from './services/viewport.service';

@Component({
  selector: 'rr-shop-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent {
  @ViewChild('content', { static: false })
  public content: ElementRef<HTMLElement>;

  public constructor(protected viewportService: ViewportService) {
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
