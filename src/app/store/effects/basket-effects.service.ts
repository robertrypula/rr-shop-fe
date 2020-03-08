import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import * as fromBasketActions from '../actions/basket.actions';
import * as fromRouterActions from '../actions/router.actions';
import { ApiProductService } from '../../api-services/api-product.service';
import { BasketFacadeService } from '../facades/basket-facade.service';

@Injectable()
export class BasketEffects {
  public potentialOrderRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromBasketActions.potentialOrderRequest),
      concatMap(action => of(action).pipe(withLatestFrom(this.basketFacadeService.potentialOrderProductsIds$))),
      switchMap(([action, potentialOrderProductsIds]) =>
        this.apiProductService.getProducts(potentialOrderProductsIds).pipe(
          map(products => fromBasketActions.potentialOrderSuccess({ products })),
          catchError((httpErrorResponse: HttpErrorResponse) =>
            of(fromBasketActions.potentialOrderFailure({ httpErrorResponse }))
          )
        )
      )
    )
  );

  public triggerPotentialOrderRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRouterActions.customRouterNavigated),
      concatMap(action => of(action).pipe(withLatestFrom(this.basketFacadeService.isOnPotentialOrderRoute$))),
      filter(([action, isOnPotentialOrderRoute]): boolean => isOnPotentialOrderRoute),
      map(() => fromBasketActions.potentialOrderRequest())
    )
  );

  public constructor(
    private actions$: Actions,
    protected apiProductService: ApiProductService,
    protected basketFacadeService: BasketFacadeService
  ) {}
}
