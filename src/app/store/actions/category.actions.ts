import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { CategoryStore, ActiveLevelUpdateEntry } from '../../models/category.model';

export const setActiveLevel = createAction(
  '[Category] Set active level',
  props<{ activeLevelUpdateEntries: ActiveLevelUpdateEntry[] }>()
);

export const setIsListCollapsed = createAction('[Category] Set is list collapsed', props<{ newValue: boolean }>());

export const categoriesAtInitRequest = createAction('[Category] At init request');

export const categoriesAtInitSuccess = createAction('[Category] At init success', props<{ categories: CategoryStore[] }>());

export const categoriesAtInitFailure = createAction(
  '[Category] At init failure',
  props<{ httpErrorResponse: HttpErrorResponse }>()
);
