import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { Product } from '../../models/product.model';

export const productsAllSimpleRequest = createAction('[Product] All simple request');

export const productsAllSimpleSuccess = createAction('[Product] All simple success', props<{ products: Product[] }>());

export const productsAllSimpleFailure = createAction(
  '[Product] All simple failure',
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
