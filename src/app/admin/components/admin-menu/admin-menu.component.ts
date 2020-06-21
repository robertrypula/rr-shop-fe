import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, of, Subject } from 'rxjs';
import { concatMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';

import { AuthorizationFacadeService } from '../../../store/facades/authorization-facade.service';
import { getExpirationSeconds } from '../../../utils/authorization.utils';
import { ClickableActionType } from '../../../components/clickable-action/clickable-action.model';

@Component({
  selector: 'rr-shop-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminMenuComponent implements OnInit, OnDestroy {
  public expirationSeconds$: Subject<number> = new Subject();

  public readonly ClickableActionType = ClickableActionType;

  protected timer: Observable<number> = interval(500);
  protected unsubscribe$ = new Subject<void>();

  public constructor(protected authorizationFacadeService: AuthorizationFacadeService) {}

  public ngOnInit() {
    this.intervalStart();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public intervalStart(): void {
    this.timer
      .pipe(
        takeUntil(this.unsubscribe$),
        concatMap(counter => of(counter).pipe(withLatestFrom(this.authorizationFacadeService.expirationTime$))),
        tap(([counter, expirationTime]) => {
          this.timeTick(expirationTime);
        })
      )
      .subscribe();
  }

  protected timeTick(expirationTime: number): void {
    this.expirationSeconds$.next(getExpirationSeconds(expirationTime));
  }
}
