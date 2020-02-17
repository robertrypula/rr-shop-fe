import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction, routerNavigationAction } from '@ngrx/router-store';
import { catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { RouterFacadeService } from '../facades/router-facade.service';
import {
  productsAtInitFailure,
  productsAtInitRequest,
  productsAtInitSuccess,
  productsAtCategoryFailure,
  productsAtCategoryRequest,
  productsAtCategorySuccess
} from '../actions/product.actions';
import { ApiProductService } from '../../api-services/api-product.service';
import { CategoryFacadeService } from '../facades/category-facade.service';
import { isCategoryUrl } from '../../utils/routing.util';

@Injectable()
export class ProductsEffects {
  public loadProductsAtInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsAtInitRequest),
      switchMap(() =>
        this.apiProductService.getProductsAtInit().pipe(
          map(products => productsAtInitSuccess({ products })),
          catchError((httpErrorResponse: HttpErrorResponse) => of(productsAtInitFailure({ httpErrorResponse })))
        )
      )
    )
  );

  public triggerProductsAtInitLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      concatMap(action => of(action).pipe(withLatestFrom(this.routerFacadeService.navigationId$))),
      mergeMap(([action, navigationId]) => (navigationId === 1 ? of(productsAtInitRequest()) : EMPTY))
    )
  );

  public loadProductsAtCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsAtCategoryRequest),
      concatMap(action => of(action).pipe(withLatestFrom(this.categoryFacadeService.activeCategoryAndItsChildren$))),
      switchMap(([action, activeCategoryAndItsChildren]) =>
        this.apiProductService.getProductsAtCategory(activeCategoryAndItsChildren.map(c => c.id)).pipe(
          map(products => productsAtCategorySuccess({ products })),
          catchError((httpErrorResponse: HttpErrorResponse) => of(productsAtCategoryFailure({ httpErrorResponse })))
        )
      )
    )
  );

  public triggerProductsAtCategoryLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigationAction),
      filter(action => isCategoryUrl(action.payload.routerState.url)),
      map(() => productsAtCategoryRequest())
    )
  );

  public constructor(
    private actions$: Actions,
    protected routerFacadeService: RouterFacadeService,
    protected categoryFacadeService: CategoryFacadeService,
    protected apiProductService: ApiProductService
  ) {}
}
