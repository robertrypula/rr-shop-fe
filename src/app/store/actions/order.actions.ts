import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { Product } from '../../models/product.model';
import { OrderStore } from '../../models/order.model';

export const add = createAction('[Order] Add', props<{ productId: number; quantity: number }>());

export const chooseDelivery = createAction('[Order] Choose delivery', props<{ productId: number }>());

export const choosePayment = createAction('[Order] Choose payment', props<{ productId: number }>());

export const createOrderRequest = createAction('[Order] Create order request');

export const createOrderSuccess = createAction('[Order] Create order success', props<{ orderStore: OrderStore }>());

export const createOrderFailure = createAction(
  '[Order] Create order failure',
  props<{ httpErrorResponse: HttpErrorResponse }>()
);

export const orderRequest = createAction('[Order] Order request');

export const orderSuccess = createAction('[Order] Order success', props<{ orderStore: OrderStore }>());

export const orderFailure = createAction('[Order] Order failure', props<{ httpErrorResponse: HttpErrorResponse }>());

export const potentialOrderProductsRequest = createAction('[Order] Potential order products request');

export const potentialOrderProductsSuccess = createAction(
  '[Order] Potential order products success',
  props<{ products: Product[] }>()
);

export const potentialOrderProductsFailure = createAction(
  '[Order] Potential order products failure',
  props<{ httpErrorResponse: HttpErrorResponse }>()
);

export const quantityIncrement = createAction('[Order] Quantity increment', props<{ id: number }>());

export const quantityDecrement = createAction('[Order] Quantity decrement', props<{ id: number }>());

export const quantitySetTo = createAction('[Order] Quantity set to', props<{ id: number; quantity: number }>());

export const remove = createAction('[Order] Remove', props<{ id: number }>());
