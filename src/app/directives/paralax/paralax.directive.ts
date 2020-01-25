import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[rrShopParalax]'
})
export class ParalaxDirective implements OnInit, OnDestroy {
  @Input() public parallaxOffset = 0;
  @Input() public parallaxAmount = 100;

  protected animationFrameRequest: number = null;
  protected top: number;

  public scrollHandler = (): void => {
    this.update();
  };

  public resizeHandler = (): void => {
    this.update();
  };

  public constructor(private elementRef: ElementRef) {}

  // TODO check on better days the 'Angular way' of registering listeners...
  // @HostListener('window:scroll')
  // public onWindowScroll(): void {}

  public ngOnInit(): void {
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
    window.addEventListener('resize', this.resizeHandler, { passive: true });
    this.update();
  }

  public ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollHandler);
    window.removeEventListener('resize', this.resizeHandler);
  }

  protected update(): void {
    const nativeElement: HTMLElement = this.elementRef.nativeElement;
    const viewportHeight: number = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const elementTop: number = nativeElement.getBoundingClientRect().top + nativeElement.clientHeight * 0.5;
    const unitPosition: number = -2 * (elementTop / viewportHeight - 0.5);

    this.top = this.parallaxOffset + unitPosition * this.parallaxAmount;

    this.animationFrameRequest !== null && cancelAnimationFrame(this.animationFrameRequest);
    this.animationFrameRequest = requestAnimationFrame(() => {
      this.elementRef.nativeElement.style.backgroundPositionY = this.top + 'px';
    });
  }
}
