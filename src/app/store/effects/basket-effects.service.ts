import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import * as fromCategoryActions from '../actions/category.actions';
import * as fromProductActions from '../actions/product.actions';
import { ApiProductService } from '../../api-services/api-product.service';
import { BasketFacadeService } from '../facades/basket-facade.service';
import { routerNavigatedAction } from '@ngrx/router-store';

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

  // public triggerBasketLoad$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(routerNavigatedAction),
  //     concatMap(action =>
  //       of(action).pipe(
  //         withLatestFrom(this.basketFacadeService.isOnBasketRoute$, this.basketFacadeService.productsLength$)
  //       )
  //     ),
  //     filter(([action, isOnProductRoute, productsLength]) => isOnProductRoute && !!productsLength),
  //     map(() => fromProductActions.productRequest())
  //   )
  // );

  public constructor(
    private actions$: Actions,
    protected apiProductService: ApiProductService,
    protected basketFacadeService: BasketFacadeService
  ) {}
}
