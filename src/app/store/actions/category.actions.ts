import { createAction, props } from '@ngrx/store';

export const setActiveLevel = createAction('[Category] Set active level', props<{ id: number; activeLevel: number }>());
