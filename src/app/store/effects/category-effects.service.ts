import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { categoriesFailure, categoriesRequest, categoriesSuccess } from '../actions/category.actions';
import { ApiCategoryService } from '../../api-services/api-category.service';
import { Category } from '../../models/category.model';

@Injectable()
export class CategoryEffects {
  public loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriesRequest),
      mergeMap(() =>
        this.apiCategoryService.getCategories().pipe(
          map((categories: Category[]) => categoriesSuccess({ categories })),
          catchError((httpErrorResponse: HttpErrorResponse) => of(categoriesFailure({ httpErrorResponse })))
        )
      )
    )
  );

  public constructor(private actions$: Actions, protected apiCategoryService: ApiCategoryService) {}
}
