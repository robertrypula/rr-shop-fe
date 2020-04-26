import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { ApiProductService } from '../../rest-api/product/api-product.service';
import { ProductStore } from '../../models/product.model';
import * as fromRouterActions from '../actions/router.actions';
import { SearchFacadeService } from '../facades/search-facade.service';
import * as fromSearchActions from '../actions/search.actions';

@Injectable()
export class SearchEffects {
  public triggerSearchRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRouterActions.customRouterNavigated),
      concatMap(action => of(action).pipe(withLatestFrom(this.searchFacadeService.isOnSearchRoute$))),
      filter(([action, isOnSearchRoute]): boolean => isOnSearchRoute),
      map(() => fromSearchActions.searchRequest())
    )
  );

  public searchRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromSearchActions.searchRequest),
      concatMap(action => of(action).pipe(withLatestFrom(this.searchFacadeService.query$))),
      switchMap(([action, query]) =>
        this.apiProductService.getProductsByQuery(query).pipe(
          map((productsStore: ProductStore[]) => fromSearchActions.searchSuccess({ productsStore })),
          catchError((httpErrorResponse: HttpErrorResponse) =>
            of(fromSearchActions.searchFailure({ httpErrorResponse }))
          )
        )
      )
    )
  );

  public constructor(
    private actions$: Actions,
    protected apiProductService: ApiProductService,
    protected searchFacadeService: SearchFacadeService
  ) {}
}
