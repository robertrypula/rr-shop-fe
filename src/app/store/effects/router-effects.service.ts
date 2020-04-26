import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { EMPTY, of } from 'rxjs';
import { concatMap, filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { CategoryFacadeService } from '../facades/category-facade.service';
import * as fromCategoryActions from '../actions/category.actions';
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

  public constructor(
    private actions$: Actions,
    protected routerFacadeService: RouterFacadeService,
    protected categoryFacadeService: CategoryFacadeService,
    protected productFacadeService: ProductFacadeService
  ) {}
}
