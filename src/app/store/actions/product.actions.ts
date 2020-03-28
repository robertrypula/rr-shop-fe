import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { ProductStore } from '../../models/product.model';

export const productRequest = createAction('[Product] Request');

export const productSuccess = createAction('[Product] Success', props<{ productStore: ProductStore }>());

export const productFailure = createAction('[Product] Failure', props<{ httpErrorResponse: HttpErrorResponse }>());

export const productsAtInitRequest = createAction('[Product] At init request');

export const productsAtInitSuccess = createAction(
  '[Product] At init success',
  props<{ productsStore: ProductStore[] }>()
);

export const productsAtInitFailure = createAction(
  '[Product] At init failure',
  props<{ httpErrorResponse: HttpErrorResponse }>()
);

export const productsAtCategoryRequest = createAction('[Product] At category request');

export const productsAtCategorySuccess = createAction(
  '[Product] At category success',
  props<{ productsStore: ProductStore[] }>()
);

export const productsAtCategoryFailure = createAction(
  '[Product] At category failure',
  props<{ httpErrorResponse: HttpErrorResponse }>()
);
