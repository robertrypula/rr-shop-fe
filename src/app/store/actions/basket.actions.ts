import { createAction, props } from '@ngrx/store';

export const addProduct = createAction('[Basket] Add product', props<{ productId: number }>());
