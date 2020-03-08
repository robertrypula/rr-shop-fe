import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { Order } from '../../models/order.model';

export const createOrderRequest = createAction('[Order] Create order request');
export const createOrderSuccess = createAction('[Order] Create order success', props<{ order: Order }>());
export const createOrderFailure = createAction(
  '[Order] Create order failure',
  props<{ httpErrorResponse: HttpErrorResponse }>()
);
