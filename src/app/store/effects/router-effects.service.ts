import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, mergeMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { routerNavigatedAction } from '@ngrx/router-store';

import * as fromRouterActions from '../actions/router.actions';
import { RouterFacadeService } from '../facades/router-facade.service';

@Injectable()
export class RouterEffects {
  public triggerFirstRouteChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      concatMap(action => of(action).pipe(withLatestFrom(this.routerFacadeService.navigationId$))),
      mergeMap(([action, navigationId]) => (navigationId === 1 ? of(fromRouterActions.firstRouteChange()) : EMPTY))
    )
  );

  public constructor(private actions$: Actions, protected routerFacadeService: RouterFacadeService) {}
}
