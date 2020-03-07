import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { RouterFacadeService } from '../facades/router-facade.service';
import * as fromCategoryActions from '../actions/category.actions';
import * as fromProductActions from '../actions/product.actions';
import { ApiProductService } from '../../api-services/api-product.service';
import { CategoryFacadeService } from '../facades/category-facade.service';
import { ProductFacadeService } from '../facades/product-facade.service';

@Injectable()
export class ProductsEffects {
  public loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProductActions.productRequest),
      map(() => fromProductActions.productFailure({ httpErrorResponse: null })),
      concatMap(action => of(action).pipe(withLatestFrom(this.productFacadeService.activeProductId$))),
      switchMap(([action, activeProductId$]) =>
        this.apiProductService.getProduct(activeProductId$).pipe(
          map(product => fromProductActions.productSuccess({ product })),
          catchError((httpErrorResponse: HttpErrorResponse) =>
            of(fromProductActions.productFailure({ httpErrorResponse }))
          )
        )
      )
    )
  );

  public triggerProductLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromCategoryActions.categoriesAtInitSuccess,
        fromProductActions.productsAtInitSuccess,
        routerNavigatedAction
      ),
      concatMap(action =>
        of(action).pipe(
          withLatestFrom(this.productFacadeService.isOnProductRoute$, this.productFacadeService.productsLength$)
        )
      ),
      filter(([action, isOnProductRoute, productsLength]) => isOnProductRoute && !!productsLength),
      map(() => fromProductActions.productRequest())
    )
  );

  // ---------------------------------------------------------------------------

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

  public triggerProductsAtCategoryLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromCategoryActions.categoriesAtInitSuccess,
        fromProductActions.productsAtInitSuccess,
        routerNavigatedAction
      ),
      concatMap(action =>
        of(action).pipe(
          withLatestFrom(this.categoryFacadeService.isOnCategoryRoute$, this.productFacadeService.productsLength$)
        )
      ),
      filter(([action, isOnCategoryRoute, productsLength]) => isOnCategoryRoute && !!productsLength),
      map(() => fromProductActions.productsAtCategoryRequest())
    )
  );

  // ---------------------------------------------------------------------------

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

  public triggerProductsAtInitLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      concatMap(action => of(action).pipe(withLatestFrom(this.routerFacadeService.navigationId$))),
      mergeMap(([action, navigationId]) =>
        navigationId === 1 ? of(fromProductActions.productsAtInitRequest()) : EMPTY
      )
    )
  );

  public constructor(
    private actions$: Actions,
    protected apiProductService: ApiProductService,
    protected categoryFacadeService: CategoryFacadeService,
    protected productFacadeService: ProductFacadeService,
    protected routerFacadeService: RouterFacadeService
  ) {}
}
