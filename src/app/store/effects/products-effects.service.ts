import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction, routerNavigationAction } from '@ngrx/router-store';
import { catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { RouterFacadeService } from '../facades/router-facade.service';
import {
  productsAllSimpleFailure,
  productsAllSimpleRequest,
  productsAllSimpleSuccess,
  productsAtCategoryFailure,
  productsAtCategoryRequest,
  productsAtCategorySuccess
} from '../actions/product.actions';
import { ApiProductService } from '../../api-services/api-product.service';
import { CategoryFacadeService } from '../facades/category-facade.service';

@Injectable()
export class ProductsEffects {
  public loadProductsAllSimple$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsAllSimpleRequest),
      switchMap(() =>
        this.apiProductService.getProducts().pipe(
          map(products => productsAllSimpleSuccess({ products })),
          catchError((httpErrorResponse: HttpErrorResponse) => of(productsAllSimpleFailure({ httpErrorResponse })))
        )
      )
    )
  );

  public triggerProductsAllSimpleLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      concatMap(action => of(action).pipe(withLatestFrom(this.routerFacadeService.navigationId$))),
      mergeMap(([action, navigationId]) => (navigationId === 1 ? of(productsAllSimpleRequest()) : EMPTY))
    )
  );

  public loadProductsLoadAtCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsAtCategoryRequest),
      concatMap(action => of(action).pipe(withLatestFrom(this.categoryFacadeService.activeCategoryAndItsChildren$))),
      switchMap(([action, activeCategoryAndItsChildren]) =>
        this.apiProductService
          .getProducts(
            false,
            activeCategoryAndItsChildren.map(c => c.id)
          )
          .pipe(
            map(products => productsAtCategorySuccess({ products })),
            catchError((httpErrorResponse: HttpErrorResponse) => of(productsAtCategoryFailure({ httpErrorResponse })))
          )
      )
    )
  );

  public triggerProductsLoadAtCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigationAction),
      filter(action => action.payload.routerState.url.indexOf('/c/') !== -1),
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
