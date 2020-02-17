import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction, routerNavigationAction } from '@ngrx/router-store';
import { catchError, concatMap, filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, merge, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { RouterFacadeService } from '../facades/router-facade.service';
import * as fromProductActions from '../actions/product.actions';
import { ApiProductService } from '../../api-services/api-product.service';
import { CategoryFacadeService } from '../facades/category-facade.service';
import { isCategoryUrl } from '../../utils/routing.util';
import { categoriesAtInitSuccess } from '../actions/category.actions';

@Injectable()
export class ProductsEffects {
  public loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProductActions.productRequest),
      // concatMap(action => of(action).pipe(withLatestFrom(this.categoryFacadeService.activeCategoryAndItsChildren$))),
      switchMap(action =>
        this.apiProductService.getProduct(2).pipe(
          map(product => fromProductActions.productSuccess({ product })),
          catchError((httpErrorResponse: HttpErrorResponse) =>
            of(fromProductActions.productFailure({ httpErrorResponse }))
          )
        )
      )
    )
  );

  public loadProductsAtInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProductActions.productsAtInitRequest),
      switchMap(() =>
        this.apiProductService.getProductsAtInit().pipe(
          map(products => fromProductActions.productsAtInitSuccess({ products })),
          catchError((httpErrorResponse: HttpErrorResponse) =>
            of(fromProductActions.productsAtInitFailure({ httpErrorResponse }))
          )
        )
      )
    )
  );

  public loadProductsAtCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProductActions.productsAtCategoryRequest),
      concatMap(action => of(action).pipe(withLatestFrom(this.categoryFacadeService.activeCategoryAndItsChildren$))),
      switchMap(([action, activeCategoryAndItsChildren]) =>
        this.apiProductService.getProductsAtCategory(activeCategoryAndItsChildren.map(c => c.id)).pipe(
          map(products => fromProductActions.productsAtCategorySuccess({ products })),
          catchError((httpErrorResponse: HttpErrorResponse) =>
            of(fromProductActions.productsAtCategoryFailure({ httpErrorResponse }))
          )
        )
      )
    )
  );

  public triggerProductsAtInitLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      concatMap(action => of(action).pipe(withLatestFrom(this.routerFacadeService.navigationId$))),
      mergeMap(([action, navigationId]) =>
        navigationId === 1 ? of(fromProductActions.productsAtInitRequest()) : EMPTY
      )
    )
  );

  public triggerProductsAtCategoryLoad$ = createEffect(() =>
    merge(
      this.actions$.pipe(
        ofType(routerNavigationAction),
        concatMap(action => of(action).pipe(withLatestFrom(this.categoryFacadeService.categoryLength$))),
        filter(([action, categoryLength]) => isCategoryUrl(action.payload.routerState.url) && !!categoryLength)
      ),
      this.actions$.pipe(ofType(categoriesAtInitSuccess))
    ).pipe(map(() => fromProductActions.productsAtCategoryRequest()))
  );

  public constructor(
    private actions$: Actions,
    protected routerFacadeService: RouterFacadeService,
    protected categoryFacadeService: CategoryFacadeService,
    protected apiProductService: ApiProductService
  ) {}
}
