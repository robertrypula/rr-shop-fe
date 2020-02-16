import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { catchError, concatMap, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { RouterFacadeService } from '../facades/router-facade.service';
import { productsFailure, productsRequest, productsSuccess } from '../actions/product.actions';
import { ApiProductService } from '../../api-services/api-product.service';

@Injectable()
export class ProductsEffects {
  public loadProductsFromApi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsRequest),
      switchMap(() =>
        this.apiProductService.getProducts().pipe(
          map(products => productsSuccess({ products })),
          catchError((httpErrorResponse: HttpErrorResponse) => of(productsFailure({ httpErrorResponse })))
        )
      )
    )
  );

  public triggerProductsLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      concatMap(action => of(action).pipe(withLatestFrom(this.routerFacadeService.navigationId$))),
      mergeMap(([action, navigationId]) => (navigationId === 1 ? of(productsRequest()) : EMPTY))
    )
  );

  public constructor(
    private actions$: Actions,
    protected routerFacadeService: RouterFacadeService,
    protected apiProductService: ApiProductService
  ) {}
}
