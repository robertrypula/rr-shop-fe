import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';

import * as fromBasketActions from '../actions/basket.actions';
import * as fromRouterActions from '../actions/router.actions';
import { ApiProductService } from '../../api-services/api-product.service';
import { BasketFacadeService } from '../facades/basket-facade.service';

@Injectable()
export class BasketEffects {
  public triggerPotentialOrderRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRouterActions.customRouterNavigated),
      tap(d => {
        console.log(d);
      }),
      map(() => fromBasketActions.potentialOrderRequest())
    )
  );

  public constructor(
    private actions$: Actions,
    protected apiProductService: ApiProductService,
    protected basketFacadeService: BasketFacadeService
  ) {}
}
