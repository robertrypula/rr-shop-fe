import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { ProductStore } from '../../models/product.model';

export const productsAtMainPageRequest = createAction('[Page] Products at Main Page request');

export const productsAtMainPageSuccess = createAction(
  '[Product] Products at Main Page success',
  props<{ productsStore: ProductStore[] }>()
);

export const productsAtMainPageFailure = createAction(
  '[Product] Products at Main Page failure',
  props<{ httpErrorResponse: HttpErrorResponse }>()
);
