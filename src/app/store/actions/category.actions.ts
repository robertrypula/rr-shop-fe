import { createAction, props } from '@ngrx/store';

import { CategorySetActiveLevel } from '../../models/category.model';

export const setActiveLevel = createAction(
  '[Category] Set active level',
  props<{ categorySetActiveLevels: CategorySetActiveLevel[] }>()
);
