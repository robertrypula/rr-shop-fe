import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of, EMPTY } from 'rxjs';

import {
  categoriesFailure,
  categoriesRequest,
  categoriesSuccess,
  setActiveLevel,
  setIsListCollapsed
} from '../actions/category.actions';
import { ApiCategoryService } from '../../api-services/api-category.service';
import { CategoryFacadeService } from '../facades/category-facade.service';
import { routerNavigatedAction } from '@ngrx/router-store';
import { RouterFacadeService } from '../facades/router-facade.service';
import { ViewportService } from '../../services/viewport.service';
import { Device } from '../../models/viewport.model';

/*
  https://www.freecodecamp.org/news/best-practices-for-a-clean-and-performant-angular-application-288e7b39eb6f/

    7) Use appropriate operators
      - switchMap: when you want to ignore the previous emissions when there is a new emission
      - mergeMap: when you want to concurrently handle all the emissions
      - concatMap: when you want to handle the emissions one after the other as they are emitted
      - exhaustMap: when you want to cancel all the new emissions while processing a previous emisssion
 */

@Injectable()
export class CategoryEffects {
  public loadCategoriesFromApi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriesRequest),
      switchMap(() =>
        this.apiCategoryService.getCategories().pipe(
          map(categories => categoriesSuccess({ categories })),
          catchError((httpErrorResponse: HttpErrorResponse) => of(categoriesFailure({ httpErrorResponse })))
        )
      )
    )
  );

  public setActiveLevel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriesSuccess, routerNavigatedAction),
      // TODO check if 'concatMap ... of(action)' is really needed
      concatMap(action =>
        of(action).pipe(withLatestFrom(this.categoryFacadeService.activeLevelUpdateEntriesBasedOnRoute$))
      ),
      map(([action, activeLevelUpdateEntries]) => setActiveLevel({ activeLevelUpdateEntries }))
    )
  );

  public triggerCategoryLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      concatMap(action => of(action).pipe(withLatestFrom(this.routerFacadeService.navigationId$))),
      mergeMap(([action, navigationID]) => (navigationID === 1 ? of(categoriesRequest()) : EMPTY))
    )
  );

  // public expandOrCollapseListWhenViewportChange$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(routerNavigatedAction),
  //     concatMap(action => of(action).pipe(withLatestFrom(this.viewportService.device$))),
  //     tap(([action, device]) => {
  //       console.log(action, device);
  //     }),
  //     map(([action, device]) =>
  //       setIsListCollapsed({ newValue: ![Device.Mobile, Device.MobileVertical].includes(device) })
  //     )
  //   )
  // );

  // public collapseListAfterFirstNavigation$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(routerNavigatedAction),
  //     concatMap(action => of(action).pipe(withLatestFrom(this.routerFacadeService.navigationId$))),
  //     map(([action, navigationID]) => (navigationID === 1 ? categoriesRequest() : { type: 'empty' }))
  //   )
  // );

  public constructor(
    private actions$: Actions,
    protected apiCategoryService: ApiCategoryService,
    protected categoryFacadeService: CategoryFacadeService,
    protected routerFacadeService: RouterFacadeService,
    protected viewportService: ViewportService
  ) {}
}
