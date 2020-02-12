import { createAction, props } from '@ngrx/store';

import { CategorySetActiveLevel } from '../../models/category.model';

export const setActiveLevel = createAction(
  '[Category] Set active level',
  props<{ categorySetActiveLevels: CategorySetActiveLevel[] }>()
);

export const effectTest = createAction('[Category] Effect test', props<{ dataTest: number[] }>());

/*
REQUEST
SUCCESS
FAILURE
*/
