import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { CategoryStore } from '../../models/category.model';
import { ClickableActionType } from '../clickable-action/clickable-action.model';
import { IconType } from '../icon/icon.models';

@Component({
  selector: 'rr-shop-slider-category',
  templateUrl: './slider-category.component.html',
  styleUrls: ['./slider-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderCategoryComponent implements OnInit, OnDestroy {
  @Input()
  public categories: CategoryStore[];

  public current = 0;

  public readonly ClickableActionType = ClickableActionType;
  public readonly IconType = IconType;

  protected timer: Observable<number> = interval(5000);
  protected unsubscribe$ = new Subject<void>();

  public constructor(protected changeDetectorRef: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.intervalStart();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public isDisabledNext(): boolean {
    return this.categories && this.current === this.categories.length - 1;
  }

  public isDisabledPrevious(): boolean {
    return this.current === 0;
  }

  public onNextClick(): void {
    this.current = this.categories && this.categories.length > 1 ? (this.current + 1) % this.categories.length : 0;
  }

  public onPreviousClick(): void {
    this.current =
      this.categories && this.categories.length > 1
        ? (this.categories.length + this.current - 1) % this.categories.length
        : 0;
  }

  public trackBy(index: number, item: CategoryStore): string {
    return item.id + '';
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
