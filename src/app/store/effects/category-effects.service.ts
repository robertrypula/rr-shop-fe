import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { categoriesFailure, categoriesRequest, categoriesSuccess } from '../actions/category.actions';
import { ApiCategoryService } from '../../api-services/api-category.service';
import { Category } from '../../models/category.model';
import { CategoryFacadeService } from '../facades/category-facade.service';

@Injectable()
export class CategoryEffects {
  public loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriesRequest),
      switchMap(() => this.apiCategoryService.getCategories()),
      switchMap((categories: Category[]) => [
        categoriesSuccess({ categories }) // ,
        // withLatestFrom(
        //   this.categoryFacadeService.activeLevelUpdateEntriesBasedOnRoute$,
        //   () => {
        //
        //   }
        // )
      ]),
      catchError((httpErrorResponse: HttpErrorResponse) => of(categoriesFailure({ httpErrorResponse })))
    )
  );

  public constructor(
    private actions$: Actions,
    protected apiCategoryService: ApiCategoryService,
    protected categoryFacadeService: CategoryFacadeService
  ) {}
}
