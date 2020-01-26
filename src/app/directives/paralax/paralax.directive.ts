import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import {
  DEFAULT_PARALAX_AMOUNT,
  DEFAULT_PARALAX_OFFSET,
  DEFAULT_PARALAX_VIEWPORT_WIDTH_THRESHOLD,
  RESIZE_DEBOUNCE_TIME
} from './paralax.config';

@Directive({
  selector: '[rrShopParalax]'
})
export class ParalaxDirective implements OnInit, OnDestroy {
  @Input() public parallaxAmount = DEFAULT_PARALAX_AMOUNT;
  @Input() public parallaxOffset = DEFAULT_PARALAX_OFFSET;
  @Input() public parallaxViewportWidthThreshold = DEFAULT_PARALAX_VIEWPORT_WIDTH_THRESHOLD;

  protected animationFrameRequest: number = null;
  protected resizeSubscription: Subscription;
  protected scrollSubscription: Subscription;
  protected top: number;

  public constructor(protected elementRef: ElementRef) {
    // TODO investigate change detection, currently it consumes 40% of CPU when scrolling fast
    // , protected zone: NgZone
    // , protected changeDetectorRef: ChangeDetectorRef
    // changeDetectorRef.detach();
  }

  // TODO check on better days if the 'Angular way' of registering listeners could be passive...
  // @HostListener('window:scroll')
  // public onWindowScroll(): void {}

  public ngOnInit(): void {
    // this.resizeSubscription = fromEvent(window, 'scroll', { passive: true })
    //   .pipe(tap(this.update.bind(this)))
    //   .subscribe();
    //
    // this.resizeSubscription = fromEvent(window, 'resize', { passive: true })
    //   .pipe(
    //     debounceTime(RESIZE_DEBOUNCE_TIME),
    //     tap(this.update.bind(this))
    //   )
    //   .subscribe();
    //
    // this.update();
  }

  public ngOnDestroy(): void {
    this.resizeSubscription.unsubscribe();
    this.scrollSubscription.unsubscribe();
  }

  protected update(): void {
    const nativeElement: HTMLElement = this.elementRef.nativeElement;
    const boundingClientRect: ClientRect | DOMRect = nativeElement.getBoundingClientRect();
    const viewportWidth: number = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    if (viewportWidth < this.parallaxViewportWidthThreshold) {
      return;
    }

    const viewportHeight: number = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const isOutsideViewport: boolean =
      (boundingClientRect.top < 0 && boundingClientRect.bottom < 0) ||
      (boundingClientRect.top > viewportHeight && boundingClientRect.bottom > viewportHeight);

    if (isOutsideViewport) {
      return;
    }

    const positionInViewport: number = boundingClientRect.top + nativeElement.clientHeight * 0.5;
    const unitPosition: number = -2 * (positionInViewport / viewportHeight - 0.5);

    this.top = this.parallaxOffset + unitPosition * this.parallaxAmount;

    this.animationFrameRequest !== null && cancelAnimationFrame(this.animationFrameRequest);
    this.animationFrameRequest = requestAnimationFrame(() => {
      this.elementRef.nativeElement.style.backgroundPositionY = this.top + 'px';
    });
  }
}
