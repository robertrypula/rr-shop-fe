import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, concatMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import * as fromOrderActions from '../actions/order.actions';
import { Order } from '../../models/order.model';
import { ApiOrderService } from '../../api-services/api-order.service';
import { BasketFacadeService } from '../facades/basket-facade.service';

@Injectable()
export class OrderEffects {
  public createOrderRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOrderActions.createOrderRequest),
      concatMap(action => of(action).pipe(withLatestFrom(this.basketFacadeService.isBasketValid$))),
      switchMap(([action, isBasketValid]) =>
        this.apiOrderService.createOrder().pipe(
          map((order: Order) => fromOrderActions.createOrderSuccess({ order })),
          catchError((httpErrorResponse: HttpErrorResponse) =>
            of(fromOrderActions.createOrderFailure({ httpErrorResponse }))
          )
        )
      )
    )
  );

  public constructor(
    private actions$: Actions,
    protected apiOrderService: ApiOrderService,
    protected basketFacadeService: BasketFacadeService
  ) {}
}
