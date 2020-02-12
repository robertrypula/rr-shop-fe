import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { Category, CategorySetActiveLevel } from '../../models/category.model';

export const setActiveLevel = createAction(
  '[Category] Set active level',
  props<{ categorySetActiveLevels: CategorySetActiveLevel[] }>()
);

export const categoriesRequest = createAction('[Category] Request');

export const categoriesSuccess = createAction('[Category] Success', props<{ categories: Category[] }>());

export const categoriesFailure = createAction('[Category] Failure', props<{ httpErrorResponse: HttpErrorResponse }>());
