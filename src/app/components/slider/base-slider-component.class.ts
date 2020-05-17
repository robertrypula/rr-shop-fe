import { ChangeDetectorRef, Injectable } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { ClickableActionType } from '../clickable-action/clickable-action.model';
import { SLIDER_INTERVAL } from '../../config';
import { IconType } from '../icon/icon.models';

@Injectable()
export abstract class BaseSliderComponent {
  public current = 0;

  public constructor(protected changeDetectorRef: ChangeDetectorRef) {}

  public readonly ClickableActionType = ClickableActionType;
  public readonly IconType = IconType;

  protected timer: Observable<number> = interval(SLIDER_INTERVAL);
  protected unsubscribe$ = new Subject<void>();

  public abstract getLength(): number;

  public init(): void {
    if (this.getLength() > 1) {
      this.intervalStart();
    }
  }

  public destroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public isDisabledNext(): boolean {
    return this.current === this.getLength() - 1;
  }

  public isDisabledPrevious(): boolean {
    return this.current === 0;
  }

  public onNextClick(): void {
    this.current = this.getLength() > 1 ? (this.current + 1) % this.getLength() : 0;
  }

  public onPreviousClick(): void {
    this.current = this.getLength() > 1 ? (this.getLength() + this.current - 1) % this.getLength() : 0;
  }

  public intervalStart(): void {
    this.timer
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(() => this.timeTick())
      )
      .subscribe();
  }

  public intervalReset(): void {
    this.intervalStop();
    this.intervalStart();
  }

  public intervalStop(): void {
    this.unsubscribe$.next();
  }

  protected timeTick(): void {
    this.onNextClick();
    this.changeDetectorRef.markForCheck();
  }
}
