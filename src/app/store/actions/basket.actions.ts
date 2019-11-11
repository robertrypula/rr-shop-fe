import { createAction, props } from '@ngrx/store';

export const add = createAction('[Basket] Add', props<{ id: number; quantity: number }>());

export const remove = createAction('[Basket] Remove', props<{ id: number }>());

export const quantityIncrement = createAction('[Basket] Quantity increment', props<{ id: number }>());

export const quantityDecrement = createAction('[Basket] Quantity decrement', props<{ id: number }>());

export const quantitySetTo = createAction('[Basket] Quantity set to', props<{ id: number; quantity: number }>());
