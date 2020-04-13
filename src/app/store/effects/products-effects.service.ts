import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import * as fromPageActions from '../actions/page.actions';
import * as fromProductActions from '../actions/product.actions';
import * as fromRouterActions from '../actions/router.actions';
import { ApiProductService } from '../../rest-api/product/api-product.service';
import { CategoryFacadeService } from '../facades/category-facade.service';
import { ProductFacadeService } from '../facades/product-facade.service';
import { ProductStore } from '../../models/product.model';
import { PageFacadeService } from '../facades/page-facade.service';

@Injectable()
export class ProductsEffects {
  public productRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProductActions.productRequest),
      concatMap(action => of(action).pipe(withLatestFrom(this.productFacadeService.urlProductId$))),
      switchMap(([action, activeProductId]) =>
        this.apiProductService.getProduct(activeProductId).pipe(
          map((productStore: ProductStore) => fromProductActions.productSuccess({ productStore })),
          catchError((httpErrorResponse: HttpErrorResponse) =>
            of(fromProductActions.productFailure({ httpErrorResponse }))
          )
        )
      )
    )
  );

  public triggerProductRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRouterActions.customRouterNavigated),
      concatMap(action => of(action).pipe(withLatestFrom(this.productFacadeService.isOnProductRoute$))),
      filter(([action, isOnProductRoute]): boolean => isOnProductRoute),
      map(() => fromProductActions.productRequest())
    )
  );

  // ---------------------------------------------------------------------------

  public productsAtCategoryRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProductActions.productsAtCategoryRequest),
      concatMap(action => of(action).pipe(withLatestFrom(this.categoryFacadeService.activeCategoryAndItsChildren$))),
      switchMap(([action, activeCategoryAndItsChildren]) =>
        this.apiProductService.getProductsByCategoryIds(activeCategoryAndItsChildren.map(c => c.id)).pipe(
          map((productsStore: ProductStore[]) => fromProductActions.productsAtCategorySuccess({ productsStore })),
          catchError((httpErrorResponse: HttpErrorResponse) =>
            of(fromProductActions.productsAtCategoryFailure({ httpErrorResponse }))
          )
        )
      )
    )
  );

  public triggerProductsAtCategoryRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRouterActions.customRouterNavigated),
      concatMap(action => of(action).pipe(withLatestFrom(this.categoryFacadeService.isOnCategoryRoute$))),
      filter(([action, isOnCategoryRoute]): boolean => isOnCategoryRoute),
      map(() => fromProductActions.productsAtCategoryRequest())
    )
  );

  // ---------------------------------------------------------------------------

  public productsAtInitRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProductActions.productsAtInitRequest),
      switchMap(() =>
        this.apiProductService.getProductsAtInit().pipe(
          map((productsStore: ProductStore[]) => fromProductActions.productsAtInitSuccess({ productsStore })),
          catchError((httpErrorResponse: HttpErrorResponse) =>
            of(fromProductActions.productsAtInitFailure({ httpErrorResponse }))
          )
        )
      )
    )
  );

  public triggerProductsAtInitRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRouterActions.firstRouteChange),
      map(() => fromProductActions.productsAtInitRequest())
    )
  );

  // ---------------------------------------------------------------------------

  public productsAtMainPageRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPageActions.productsAtMainPageRequest),
      concatMap(action => of(action).pipe(withLatestFrom(this.pageFacadeService.mainPageSectionsCategories$))),
      switchMap(([action, mainPageSectionsCategories]) =>
        this.apiProductService.getProductsByCategoryIds(mainPageSectionsCategories.map(c => c.id)).pipe(
          map((productsStore: ProductStore[]) => fromPageActions.productsAtMainPageSuccess({ productsStore })),
          catchError((httpErrorResponse: HttpErrorResponse) =>
            of(fromPageActions.productsAtMainPageFailure({ httpErrorResponse }))
          )
        )
      )
    )
  );

  public triggerProductsAtMainPageRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRouterActions.customRouterNavigated),
      concatMap(action => of(action).pipe(withLatestFrom(this.pageFacadeService.isOnMainPageRoute$))),
      filter(([action, isOnMainPageRoute]): boolean => isOnMainPageRoute),
      map(() => fromPageActions.productsAtMainPageRequest())
    )
  );

  public constructor(
    private actions$: Actions,
    protected apiProductService: ApiProductService,
    protected categoryFacadeService: CategoryFacadeService,
    protected pageFacadeService: PageFacadeService,
    protected productFacadeService: ProductFacadeService
  ) {}
}
