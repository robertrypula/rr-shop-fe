import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { EMPTY, of } from 'rxjs';
import { concatMap, filter, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';

import { CategoryFacadeService } from '../facades/category-facade.service';
import * as fromCategoryActions from '../actions/category.actions';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';
import { ProductFacadeService } from '../facades/product-facade.service';
import * as fromProductActions from '../actions/product.actions';
import { RouterFacadeService } from '../facades/router-facade.service';
import * as fromRouterActions from '../actions/router.actions';

@Injectable()
export class RouterEffects {
  // TODO check better solutions: https://stackoverflow.com/questions/44593306/how-to-wait-for-2-actions-in-ngrx-effects
  // TODO experiments here: https://rxviz.com/v/moYNDRXO
  public triggerCustomRouterNavigated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromCategoryActions.categoriesAtInitSuccess,
        fromProductActions.productsAtInitSuccess,
        routerNavigatedAction
      ),
      concatMap(action =>
        of(action).pipe(
          withLatestFrom(this.categoryFacadeService.categoryLength$, this.productFacadeService.productsLength$)
        )
      ),
      filter(([action, categoryLength, productsLength]): boolean => !!categoryLength && !!productsLength),
      map(() => fromRouterActions.customRouterNavigated())
    )
  );

  public triggerFirstRouteChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      concatMap(action => of(action).pipe(withLatestFrom(this.routerFacadeService.navigationId$))),
      mergeMap(([action, navigationId]) => (navigationId === 1 ? of(fromRouterActions.firstRouteChange()) : EMPTY))
    )
  );

  public triggerGoogleAnalytics = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRouterActions.customRouterNavigated),
      concatMap(action => of(action).pipe(withLatestFrom(this.routerFacadeService.url$))),
      tap(([action, url]) => {
        this.googleAnalyticsService.pushPagePath(url);
      }),
      mergeMap(() => EMPTY)
    )
  );

  public constructor(
    private actions$: Actions,
    protected categoryFacadeService: CategoryFacadeService,
    protected googleAnalyticsService: GoogleAnalyticsService,
    protected productFacadeService: ProductFacadeService,
    protected routerFacadeService: RouterFacadeService
  ) {}
}
