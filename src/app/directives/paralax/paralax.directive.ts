import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ViewportStatus } from '../../models/viewport.model';
import { ViewportService } from '../../services/viewport.service';

import {
  DEFAULT_PARALAX_AMOUNT,
  DEFAULT_PARALAX_OFFSET,
  DEFAULT_PARALAX_VIEWPORT_WIDTH_THRESHOLD
} from './paralax.config';

@Directive({
  selector: '[rrShopParalax]'
})
export class ParalaxDirective implements OnInit, OnDestroy {
  @Input() public parallaxAmount = DEFAULT_PARALAX_AMOUNT;
  @Input() public parallaxOffset = DEFAULT_PARALAX_OFFSET;
  @Input() public parallaxViewportWidthThreshold = DEFAULT_PARALAX_VIEWPORT_WIDTH_THRESHOLD;

  protected animationFrameRequest: number = null;
  protected viewportStatusSubscription: Subscription;
  protected top: number;

  public constructor(protected elementRef: ElementRef, protected viewportService: ViewportService) {
    // TODO investigate change detection, currently it consumes 40% of CPU when scrolling fast
    // , protected zone: NgZone
    // , protected changeDetectorRef: ChangeDetectorRef
    // changeDetectorRef.detach();
  }

  public ngOnInit(): void {
    this.viewportStatusSubscription = this.viewportService.viewportStatus$
      .pipe(tap(this.update.bind(this)))
      .subscribe();

    this.update(this.viewportService.getViewportStatus());
  }

  public ngOnDestroy(): void {
    this.viewportStatusSubscription.unsubscribe();
  }

  protected update(viewportStatus: ViewportStatus): void {
    const nativeElement: HTMLElement = this.elementRef.nativeElement;
    const boundingClientRect: ClientRect | DOMRect = nativeElement.getBoundingClientRect();

    if (viewportStatus.width < this.parallaxViewportWidthThreshold) {
      return;
    }

    const isOutsideViewport: boolean =
      (boundingClientRect.top < 0 && boundingClientRect.bottom < 0) ||
      (boundingClientRect.top > viewportStatus.height && boundingClientRect.bottom > viewportStatus.height);

    if (isOutsideViewport) {
      return;
    }

    const positionInViewport: number = boundingClientRect.top + nativeElement.clientHeight * 0.5;
    const unitPosition: number = -2 * (positionInViewport / viewportStatus.height - 0.5);

    this.top = this.parallaxOffset + unitPosition * this.parallaxAmount;

    this.animationFrameRequest !== null && cancelAnimationFrame(this.animationFrameRequest);
    this.animationFrameRequest = requestAnimationFrame(() => {
      this.elementRef.nativeElement.style.backgroundPositionY = this.top + 'px';
    });
  }
}
