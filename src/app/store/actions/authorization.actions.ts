import { createAction, props } from '@ngrx/store';

export const setToken = createAction('[Authorization] Set token', props<{ token: string }>());
