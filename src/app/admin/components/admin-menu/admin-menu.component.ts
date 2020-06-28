import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { interval, merge, Observable, of, Subject } from 'rxjs';
import { concatMap, distinctUntilChanged, map, takeUntil, tap, withLatestFrom } from 'rxjs/operators';

import { AuthorizationFacadeService } from '../../../store/facades/authorization-facade.service';
import { getExpirationSeconds } from '../../../utils/authorization.utils';
import { ClickableActionType } from '../../../components/clickable-action/clickable-action.model';

const ONE_SECOND_NYQUIST_FREQUENCY_INTERVAL = 500;

@Component({
  selector: 'rr-shop-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminMenuComponent implements OnInit, OnDestroy {
  public expirationSeconds$: Subject<number> = new Subject();

  public readonly ClickableActionType = ClickableActionType;

  protected timer: Observable<number> = interval(ONE_SECOND_NYQUIST_FREQUENCY_INTERVAL);
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
    merge(this.timer, this.authorizationFacadeService.expirationTime$)
      .pipe(
        takeUntil(this.unsubscribe$),
        concatMap(mergedValue => of(mergedValue).pipe(withLatestFrom(this.authorizationFacadeService.expirationTime$))),
        map(([mergedValue, expirationTime]) => getExpirationSeconds(expirationTime)),
        distinctUntilChanged(),
        tap((expirationSeconds: number): void => {
          this.expirationSeconds$.next(expirationSeconds);
        })
      )
      .subscribe();
  }
}
