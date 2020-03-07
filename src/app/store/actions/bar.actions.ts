import { createAction, props } from '@ngrx/store';

export const showError = createAction('[Bar] Show error', props<{ message: string }>());
export const showSuccess = createAction('[Bar] Show success', props<{ message: string }>());
export const close = createAction('[Bar] Close', props<{ id: number }>());
