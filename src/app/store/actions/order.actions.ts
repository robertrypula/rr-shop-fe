import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { Product } from '../../models/product.model';
import { OrderStore } from '../../models/order.model';
import { PromoCodeStore } from '../../models/promo-code.model';

export const add = createAction('[Order] Add', props<{ productId: number }>());

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

export const potentialOrderLoad = createAction('[Order] Potential order load');

export const potentialOrderProductsRequest = createAction('[Order] Potential order products request');

export const potentialOrderProductsSuccess = createAction(
  '[Order] Potential order products success',
  props<{ products: Product[] }>()
);

export const potentialOrderProductsFailure = createAction(
  '[Order] Potential order products failure',
  props<{ httpErrorResponse: HttpErrorResponse }>()
);

export const promoCodeRequest = createAction('[Order] Promo code request');

export const promoCodeReset = createAction('[Order] Promo code reset');

export const promoCodeSuccess = createAction('[Order] Promo code success', props<{ promoCodeStore: PromoCodeStore }>());

export const promoCodeFailure = createAction(
  '[Order] Promo code failure',
  props<{ httpErrorResponse: HttpErrorResponse }>()
);

export const quantityIncrement = createAction('[Order] Quantity increment', props<{ id: number }>());

export const quantityDecrement = createAction('[Order] Quantity decrement', props<{ id: number }>());

export const remove = createAction('[Order] Remove', props<{ id: number }>());

export const setPromoCodeTextField = createAction(
  '[Order] Set promo code text field',
  props<{ promoCodeTextField: string }>()
);
