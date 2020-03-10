import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { OrderStore } from '../../models/order.model';

export const createOrderRequest = createAction('[Order] Create order request');

export const createOrderSuccess = createAction('[Order] Create order success', props<{ orderStore: OrderStore }>());

export const createOrderFailure = createAction(
  '[Order] Create order failure',
  props<{ httpErrorResponse: HttpErrorResponse }>()
);

export const orderRequest = createAction('[Order] Order request');

export const orderSuccess = createAction('[Order] Order success', props<{ orderStore: OrderStore }>());

export const orderFailure = createAction('[Order] Order failure', props<{ httpErrorResponse: HttpErrorResponse }>());
