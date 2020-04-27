import { createAction, props } from '@ngrx/store';

import { BarType } from '../../models/bar.model';

export const acceptCookies = createAction('[Bar] Accept cookies');
export const show = createAction('[Bar] Show', props<{ message: string; barType: BarType }>());
export const close = createAction('[Bar] Close', props<{ id: number }>());
