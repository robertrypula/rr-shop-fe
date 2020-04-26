import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { EMPTY, of } from 'rxjs';
import { catchError, concatMap, filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';

import { ApiCategoryService } from '../../rest-api/category/api-category.service';
import { CategoryFacadeService } from '../facades/category-facade.service';
import * as fromCategoryActions from '../actions/category.actions';
import { SMALL_DEVICE_DEFINITION } from '../../config';
import { RouterFacadeService } from '../facades/router-facade.service';
import * as fromRouterActions from '../actions/router.actions';
import { ViewportFacadeService } from '../facades/viewport-facade.service';
import { setDevice } from '../actions/viewport.actions';

/*
  https://www.freecodecamp.org/news/best-practices-for-a-clean-and-performant-angular-application-288e7b39eb6f/

    7) Use appropriate operators
      - switchMap: when you want to ignore the previous emissions when there is a new emission
      - mergeMap: when you want to concurrently handle all the emissions
      - concatMap: when you want to handle the emissions one after the other as they are emitted
      - exhaustMap: when you want to cancel all the new emissions while processing a previous emission

    - forkJoin: when all observables complete, emit the last emitted value from each.

  Think how to aggregate category and product init calls with router change
  https://medium.com/default-to-open/angular-splitter-and-aggregation-patterns-for-ngrx-effects-c6f2908edf26
 */

// TODO check if 'concatMap ... of(action)' is really needed

@Injectable()
export class CategoryEffects {
  public categoryAtInitRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCategoryActions.categoriesAtInitRequest),
      switchMap(() =>
        this.apiCategoryService.getCategoriesAtInit().pipe(
          map(categories => fromCategoryActions.categoriesAtInitSuccess({ categories })),
          catchError((httpErrorResponse: HttpErrorResponse) =>
            of(fromCategoryActions.categoriesAtInitFailure({ httpErrorResponse }))
          )
        )
      )
    )
  );

  public triggerCategoryAtInitRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRouterActions.firstRouteChange),
      map(() => fromCategoryActions.categoriesAtInitRequest())
    )
  );

  // ---------------------------------------------------------------------------

  public setActiveLevel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCategoryActions.categoriesAtInitSuccess, routerNavigatedAction),
      concatMap(action =>
        of(action).pipe(
          withLatestFrom(
            this.categoryFacadeService.activeLevelUpdateEntriesBasedOnRoute$,
            this.categoryFacadeService.categoryLength$
          )
        )
      ),
      filter(
        ([action, activeLevelUpdateEntries, categoryLength]) => !!activeLevelUpdateEntries.length && !!categoryLength
      ),
      map(([action, activeLevelUpdateEntries, categoryLength]) =>
        fromCategoryActions.setActiveLevel({ activeLevelUpdateEntries })
      )
    )
  );

  // ---------------------------------------------------------------------------

  public expandListOnBiggerDevices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setDevice),
      mergeMap(action =>
        !SMALL_DEVICE_DEFINITION.includes(action.newValue)
          ? of(fromCategoryActions.setIsListCollapsed({ newValue: false }))
          : EMPTY
      )
    )
  );

  public collapseListAfterFirstNavigationOnSmallerDevices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      concatMap(action =>
        of(action).pipe(withLatestFrom(this.viewportFacadeService.getFurtherNavigationIdOnlyAtSmallerDevices$))
      ),
      mergeMap(([action, getFurtherNavigationIdOnlyAtSmallerDevices]) =>
        getFurtherNavigationIdOnlyAtSmallerDevices
          ? of(fromCategoryActions.setIsListCollapsed({ newValue: true }))
          : EMPTY
      )
    )
  );

  public constructor(
    private actions$: Actions,
    protected apiCategoryService: ApiCategoryService,
    protected categoryFacadeService: CategoryFacadeService,
    protected routerFacadeService: RouterFacadeService,
    protected viewportFacadeService: ViewportFacadeService
  ) {}
}
