import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import * as fromBasketActions from '../actions/basket.actions';
import * as fromRouterActions from '../actions/router.actions';
import { ApiProductService } from '../../api-services/api-product.service';
import { BasketFacadeService } from '../facades/basket-facade.service';
import { OrderStore } from '../../models/order.model';
import { ApiOrderService } from '../../api-services/api-order.service';
import { Router } from '@angular/router';

@Injectable()
export class BasketEffects {
  public orderRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromBasketActions.orderRequest)
      // concatMap(action => of(action).pipe(withLatestFrom(this.basketFacadeService.urlOrderUuid$)))
      // switchMap(([action, urlOrderUuid]) =>
      //   this.apiOrderService.getOrder(urlOrderUuid).pipe(
      //     map((orderStore: OrderStore) => fromBasketActions.orderSuccess({ orderStore })),
      //     catchError((httpErrorResponse: HttpErrorResponse) =>
      //       of(fromBasketActions.orderFailure({ httpErrorResponse }))
      //     )
      //   )
      // )
    )
  );

  public triggerOrderRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRouterActions.customRouterNavigated),
      concatMap(action => of(action).pipe(withLatestFrom(this.basketFacadeService.isOnOrderRoute$))),
      filter(([action, isOnOrderRoute]): boolean => isOnOrderRoute),
      map(() => fromBasketActions.orderRequest())
    )
  );

  // ---------------------------------------------------------------------------

  public createOrderRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromBasketActions.createOrderRequest),
      switchMap(action =>
        this.apiOrderService.createOrder().pipe(
          map((orderStore: OrderStore) => fromBasketActions.createOrderSuccess({ orderStore })),
          catchError((httpErrorResponse: HttpErrorResponse) =>
            of(fromBasketActions.createOrderFailure({ httpErrorResponse }))
          )
        )
      )
    )
  );

  // https://stackoverflow.com/questions/50566128/angular-router-navigation-inside-ngrx-effect
  public createOrderSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromBasketActions.createOrderSuccess),
        tap(action => {
          this.router.navigate(['/order', action.orderStore.uuid]).then();
        })
      ),
    { dispatch: false }
  );

  // ---------------------------------------------------------------------------

  public potentialOrderProductsRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromBasketActions.potentialOrderProductsRequest),
      concatMap(action => of(action).pipe(withLatestFrom(this.basketFacadeService.potentialOrderProductsIds$))),
      switchMap(([action, potentialOrderProductsIds]) =>
        this.apiProductService.getProducts(potentialOrderProductsIds).pipe(
          map(products => fromBasketActions.potentialOrderProductsSuccess({ products })),
          catchError((httpErrorResponse: HttpErrorResponse) =>
            of(fromBasketActions.potentialOrderProductsFailure({ httpErrorResponse }))
          )
        )
      )
    )
  );

  public triggerPotentialOrderProductsRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRouterActions.customRouterNavigated),
      concatMap(action => of(action).pipe(withLatestFrom(this.basketFacadeService.isOnPotentialOrderRoute$))),
      filter(([action, isOnPotentialOrderRoute]): boolean => isOnPotentialOrderRoute),
      map(() => fromBasketActions.potentialOrderProductsRequest())
    )
  );

  public constructor(
    private actions$: Actions,
    protected apiOrderService: ApiOrderService,
    protected apiProductService: ApiProductService,
    protected basketFacadeService: BasketFacadeService,
    protected router: Router
  ) {}
}
