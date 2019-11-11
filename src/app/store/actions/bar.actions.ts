import { createAction, props } from '@ngrx/store';

export const showSuccess = createAction('[Bar] Show success', props<{ message: string }>());
export const close = createAction('[Bar] Close', props<{ id: number }>());
