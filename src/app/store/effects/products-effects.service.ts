import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { ApiProductService } from '../../rest-api/product/api-product.service';
import { CategoryFacadeService } from '../facades/category-facade.service';
import { CategoryStore, StructuralNode } from '../../models/category.model';
import { SEO_TITLE } from '../../config';
import { PageFacadeService } from '../facades/page-facade.service';
import * as fromPageActions from '../actions/page.actions';
import { ProductFacadeService } from '../facades/product-facade.service';
import * as fromProductActions from '../actions/product.actions';
import { ProductStore } from '../../models/product.model';
import * as fromRouterActions from '../actions/router.actions';

@Injectable()
export class ProductsEffects {
  public triggerProductRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRouterActions.customRouterNavigated),
      concatMap(action => of(action).pipe(withLatestFrom(this.productFacadeService.isOnProductRoute$))),
      filter(([action, isOnProductRoute]): boolean => isOnProductRoute),
      map(() => fromProductActions.productRequest())
    )
  );

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

  public seoTitleUpdateAtProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProductActions.productSuccess),
      tap(action => {
        this.title.setTitle(SEO_TITLE(action.productStore.name));
      }),
      mergeMap(() => EMPTY)
    )
  );

  // ---------------------------------------------------------------------------

  public triggerProductsAtCategoryRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRouterActions.customRouterNavigated),
      concatMap(action => of(action).pipe(withLatestFrom(this.categoryFacadeService.shouldCallForProducts$))),
      filter(([action, shouldCallForProducts]): boolean => shouldCallForProducts),
      map(() => fromProductActions.productsAtCategoryRequest())
    )
  );

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

  public seoTitleUpdateAtCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRouterActions.customRouterNavigated),
      concatMap(action =>
        of(action).pipe(
          withLatestFrom(this.categoryFacadeService.activeCategory$, this.categoryFacadeService.isOnCategoryRoute$)
        )
      ),
      filter(([action, activeCategory, isOnCategoryRoute]): boolean => isOnCategoryRoute),
      tap(([action, activeCategory, isOnCategoryRoute]) => {
        this.title.setTitle(SEO_TITLE(activeCategory.name));
      }),
      mergeMap(() => EMPTY)
    )
  );

  // ---------------------------------------------------------------------------

  public triggerProductsAtInitRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRouterActions.firstRouteChange),
      map(() => fromProductActions.productsAtInitRequest())
    )
  );

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

  // ---------------------------------------------------------------------------

  public triggerProductsAtMainPageRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRouterActions.customRouterNavigated),
      concatMap(action => of(action).pipe(withLatestFrom(this.pageFacadeService.isOnMainPageRoute$))),
      filter(([action, isOnMainPageRoute]): boolean => isOnMainPageRoute),
      map(() => fromPageActions.productsAtMainPageRequest())
    )
  );

  public productsAtMainPageRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPageActions.productsAtMainPageRequest),
      concatMap(action =>
        of(action).pipe(
          withLatestFrom(this.categoryFacadeService.categoriesByStructuralNode$(StructuralNode.MainPageCategories))
        )
      ),
      switchMap(([action, mainPageSectionsCategories]) =>
        this.apiProductService
          .getProductsByCategoryIds(
            mainPageSectionsCategories.map((category: CategoryStore): number =>
              category.linkId ? category.linkId : category.id
            )
          )
          .pipe(
            map((productsStore: ProductStore[]) => fromPageActions.productsAtMainPageSuccess({ productsStore })),
            catchError((httpErrorResponse: HttpErrorResponse) =>
              of(fromPageActions.productsAtMainPageFailure({ httpErrorResponse }))
            )
          )
      )
    )
  );

  public seoTitleUpdateAtMainPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRouterActions.customRouterNavigated),
      concatMap(action => of(action).pipe(withLatestFrom(this.pageFacadeService.isOnMainPageRoute$))),
      filter(([action, isOnMainPageRoute]): boolean => isOnMainPageRoute),
      tap(() => {
        this.title.setTitle(SEO_TITLE());
      }),
      mergeMap(() => EMPTY)
    )
  );

  // ---------------------------------------------------------------------------

  public triggerProductsAtProductRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRouterActions.customRouterNavigated),
      concatMap(action => of(action).pipe(withLatestFrom(this.productFacadeService.isOnProductRoute$))),
      filter(([action, isOnProductRoute]): boolean => isOnProductRoute),
      map(() => fromProductActions.productsAtProductRequest())
    )
  );

  public productsAtProductRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProductActions.productsAtProductRequest),
      concatMap(action => of(action).pipe(withLatestFrom(this.productFacadeService.activeProduct$))),
      switchMap(([action, activeProduct]) =>
        this.apiProductService.getProductsByCategoryIds(activeProduct.categoryIds).pipe(
          map((productsStore: ProductStore[]) => fromProductActions.productsAtProductSuccess({ productsStore })),
          catchError((httpErrorResponse: HttpErrorResponse) =>
            of(fromProductActions.productsAtProductFailure({ httpErrorResponse }))
          )
        )
      )
    )
  );

  public constructor(
    private actions$: Actions,
    protected apiProductService: ApiProductService,
    protected categoryFacadeService: CategoryFacadeService,
    protected pageFacadeService: PageFacadeService,
    protected productFacadeService: ProductFacadeService,
    protected title: Title
  ) {}
}
