import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import * as fromBasketActions from '../actions/basket.actions';
import { ApiProductService } from '../../api-services/api-product.service';
import { BasketFacadeService } from '../facades/basket-facade.service';
import { routerNavigatedAction } from '@ngrx/router-store';
import { productsAtInitSuccess } from '../actions/product.actions';
import { categoriesAtInitSuccess } from '../actions/category.actions';

@Injectable()
export class BasketEffects {
  // public loadBasket$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromProductActions.productRequest),
  //     map(() => fromProductActions.productFailure({ httpErrorResponse: null })),
  //     concatMap(action => of(action).pipe(withLatestFrom(this.productFacadeService.activeProductId$))),
  //     switchMap(([action, activeProductId$]) =>
  //       this.apiProductService.getProduct(activeProductId$).pipe(
  //         map(product => fromProductActions.productSuccess({ product })),
  //         catchError((httpErrorResponse: HttpErrorResponse) =>
  //           of(fromProductActions.productFailure({ httpErrorResponse }))
  //         )
  //       )
  //     )
  //   )
  // );

  public triggerBasketLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      takeUntil(this.actions$.pipe(ofType(productsAtInitSuccess, categoriesAtInitSuccess))),
      // skipUntil(this.actions$.pipe(ofType(productsAtInitSuccess, categoriesAtInitSuccess))),
      concatMap(action => of(action).pipe(withLatestFrom(this.basketFacadeService.potentialOrderProductsIds$))),

      tap(d => {
        console.log(d);
      }),
      // switchMap(([action, potentialOrderProductsIds]) =>
      //         this.apiProductService.getProduct(activeProductId$).pipe(
      //           map(product => fromProductActions.productSuccess({ product })),
      //           catchError((httpErrorResponse: HttpErrorResponse) =>
      //             of(fromProductActions.productFailure({ httpErrorResponse }))
      //           )
      //         )
      //       )
      // concatMap(action =>
      //   of(action).pipe(
      //     withLatestFrom(this.basketFacadeService.isOnBasketRoute$, this.basketFacadeService.productsLength$)
      //   )
      // ),
      // filter(([action, isOnProductRoute, productsLength]) => isOnProductRoute && !!productsLength),
      map(() => fromBasketActions.potentialOrderSuccess({ products: [] }))
    )
  );

  public constructor(
    private actions$: Actions,
    protected apiProductService: ApiProductService,
    protected basketFacadeService: BasketFacadeService
  ) {}
}
