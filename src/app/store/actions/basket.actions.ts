import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { Product } from '../../models/product.model';

export const add = createAction('[Basket] Add', props<{ productId: number; quantity: number }>());

export const chooseDelivery = createAction('[Basket] Choose delivery', props<{ productId: number }>());

export const choosePayment = createAction('[Basket] Choose delivery', props<{ productId: number }>());

export const potentialOrderRequest = createAction('[Basket] Potential order request');

export const potentialOrderSuccess = createAction('[Basket] Potential order success', props<{ products: Product[] }>());

export const potentialOrderFailure = createAction(
  '[Basket] Potential order failure',
  props<{ httpErrorResponse: HttpErrorResponse }>()
);

export const quantityIncrement = createAction('[Basket] Quantity increment', props<{ id: number }>());

export const quantityDecrement = createAction('[Basket] Quantity decrement', props<{ id: number }>());

export const quantitySetTo = createAction('[Basket] Quantity set to', props<{ id: number; quantity: number }>());

export const remove = createAction('[Basket] Remove', props<{ id: number }>());
