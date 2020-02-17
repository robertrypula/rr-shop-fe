import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { Product } from '../../models/product.model';

export const productsAtInitRequest = createAction('[Product] At init request');

export const productsAtInitSuccess = createAction('[Product] At init success', props<{ products: Product[] }>());

export const productsAtInitFailure = createAction(
  '[Product] At init failure',
  props<{ httpErrorResponse: HttpErrorResponse }>()
);

export const productsAtCategoryRequest = createAction('[Product] At category request');

export const productsAtCategorySuccess = createAction(
  '[Product] At category success',
  props<{ products: Product[] }>()
);

export const productsAtCategoryFailure = createAction(
  '[Product] At category failure',
  props<{ httpErrorResponse: HttpErrorResponse }>()
);
