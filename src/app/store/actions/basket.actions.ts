import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { Product } from '../../models/product.model';
import { OrderStore } from '../../models/order.model';

export const add = createAction('[Basket] Add', props<{ productId: number; quantity: number }>());

export const chooseDelivery = createAction('[Basket] Choose delivery', props<{ productId: number }>());

export const choosePayment = createAction('[Basket] Choose payment', props<{ productId: number }>());

export const createOrderRequest = createAction('[Order] Create order request');

export const createOrderSuccess = createAction('[Order] Create order success', props<{ orderStore: OrderStore }>());

export const createOrderFailure = createAction(
  '[Order] Create order failure',
  props<{ httpErrorResponse: HttpErrorResponse }>()
);

export const orderRequest = createAction('[Order] Order request');

export const orderSuccess = createAction('[Order] Order success', props<{ orderStore: OrderStore }>());

export const orderFailure = createAction('[Order] Order failure', props<{ httpErrorResponse: HttpErrorResponse }>());

export const potentialOrderProductsRequest = createAction('[Basket] Potential order products request');

export const potentialOrderProductsSuccess = createAction(
  '[Basket] Potential order products success',
  props<{ products: Product[] }>()
);

export const potentialOrderProductsFailure = createAction(
  '[Basket] Potential order products failure',
  props<{ httpErrorResponse: HttpErrorResponse }>()
);

export const quantityIncrement = createAction('[Basket] Quantity increment', props<{ id: number }>());

export const quantityDecrement = createAction('[Basket] Quantity decrement', props<{ id: number }>());

export const quantitySetTo = createAction('[Basket] Quantity set to', props<{ id: number; quantity: number }>());

export const remove = createAction('[Basket] Remove', props<{ id: number }>());
